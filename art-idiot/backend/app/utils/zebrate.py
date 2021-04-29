import requests
import base64
import torch

from torchvision import transforms
from resnet import ResNetGenerator
from urllib.parse import urlparse
from PIL import Image, UnidentifiedImageError
from io import BytesIO
from pdf2image import convert_from_bytes


def get_image_download_link(img, is_zebra=False):
    """Generates a link allowing the PIL image to be downloaded
    in:  PIL image
    out: href string
    """
    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    subgenus = "zebra" if is_zebra else "horse"
    href = f'<a href="data:file/jpg;base64,{img_str}">Download {subgenus}</a>'
    return href


def prepare_model():
    """
    function for prepare generative model
    return model and preprocess
    """
    netG = ResNetGenerator()

    model_path = './horse2zebra_0.4.0.pth'
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


def generate_zebra(net_G, preprocess, user_img, user_url):
    """
    function for generate zebra from horse-tensor
    return image of zebra
    """
    if user_img:
        try:
            img = Image.open(user_img)
        except UnidentifiedImageError:
            img = convert_from_bytes(user_img.read(), fmt='jpeg')[0]
    else:
        response = requests.get(user_url)
        try:
            img = Image.open(BytesIO(response.content))
        except UnidentifiedImageError:
            print('Something went wrong ... Try another link, or upload an image from your local device')

    img_bin = img_to_bin(img)

    img_t = preprocess(img)
    batch_t = torch.unsqueeze(img_t, 0)

    batch_out = net_G(batch_t)

    out_t = (batch_out.data.squeeze() + 1.0) / 2.0
    out_img = transforms.ToPILImage()(out_t)

    return out_img


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


def main():
    horse_url = validate_url("Put the link to the horse picture here: ")
    net, preproc = prepare_model()
    img_file = "Upload your horse image:"
    zebra = generate_zebra(net, preproc, img_file, horse_url)
    img_bin = img_to_bin(zebra)


if __name__ == "__main__":
    main()
