import requests
import base64
import torch

from torchvision import transforms
from .resnet import ResNetGenerator
from urllib.parse import urlparse
from PIL import Image, UnidentifiedImageError
from io import BytesIO


def prepare_model():
    """
    function for prepare generative model
    return model and preprocess
    """
    netG = ResNetGenerator()

    model_path = './app/utils/horse2zebra_0.4.0.pth'
    model_data = torch.load(model_path)
    netG.load_state_dict(model_data)

    netG.eval()

    preprocess = transforms.Compose([transforms.Resize(256), transforms.ToTensor()])

    return netG, preprocess


def img_to_bin(im):
    """
    function for encode image ti binary
    return binary object
    """
    buffered = BytesIO()
    im.save(buffered, format="PNG")
    bin_im = base64.b64encode(buffered.getvalue())
    return bin_im


def generate_zebra_from_image(user_img):
    """
    function for generate zebra from horse-tensor
    return image of zebra
    """

    net_G, preprocess = prepare_model()

    img = Image.open(user_img)

    horse_img_bin = img_to_bin(img)

    img_t = preprocess(img)
    batch_t = torch.unsqueeze(img_t, 0)

    batch_out = net_G(batch_t)

    out_t = (batch_out.data.squeeze() + 1.0) / 2.0
    out_img = transforms.ToPILImage()(out_t)

    zebra_img_bin = img_to_bin(out_img)

    return zebra_img_bin, horse_img_bin


def generate_zebra_from_link(user_url):
    """
    function for generate zebra from horse-tensor
    return image of zebra
    """
    net_G, preprocess = prepare_model()

    response = requests.get(user_url)
    try:
        img = Image.open(BytesIO(response.content))
    except UnidentifiedImageError:
        print('Something went wrong ... Try another link, or upload an image from your local device')

    horse_img_bin = img_to_bin(img)

    img_t = preprocess(img)
    batch_t = torch.unsqueeze(img_t, 0)

    batch_out = net_G(batch_t)

    out_t = (batch_out.data.squeeze() + 1.0) / 2.0
    out_img = transforms.ToPILImage()(out_t)

    zebra_img_bin = img_to_bin(out_img)

    return zebra_img_bin, horse_img_bin


def validate_url(url):
    try:
        result = urlparse(url)
        if all([result.scheme, result.netloc]):
            return url
        elif not url:
            return False
        else:
            print("it doesn't look like a picture link")
            return False
    except AttributeError:
        return False
