<p align="center">
  <img src="logo.png" width="250"/>
</p>

### Министерство науки и высшего образования Российской Федерации

### Федеральное государственное бюджетное образовательное учреждение высшего образования

### «Московский государственный технический университет имени Н.Э. Баумана

### (национальный исследовательский университет)» (МГТУ им. Н.Э. Баумана)

ФАКУЛЬТЕТ Информатика и системы управления \
КАФЕДРА Программное обеспечение ЭВМ и информационные технологии \
ДИСЦИПЛИНА Основы WEB разработки

### ОТЧЁТ ПО ЛАБОРАТОРНОЙ РАБОТЕ № 2

### "Знакомство с `nginx`"

Выполнил:
студент группы ИУ7-68Б(В) \
Косаревский Д.П. \
Преподаватель: Бекасов Д. Е. \
Москва, 2021 г.

#### Задача: Сконфигурировать `nginx` сервер

В данной работе необходимо оценить как изменятся качественные показатели работы веб-сервера после добавления фронтенд-сервера, для этого предлагается воспользоваться утилитой для тестирования сервера: [ApacheBenchmark](https://admins.su/site-speed-ab/) (либо аналогом).
Замечание. При использовании AB не стоит допускать деградации производительности сервера. Также предлагается изначально зафиксировать общее количество запросов и количество конкурентных запросов для утилиты `AB`. 
Результаты оформить в виде отчёта `.md`.
Код и конфигурацию `nginx` разместить в репозитории в папке `lab2`.

1. Замерьте скорость отдачи контента на сервере из лабораторной работы №1 (отдача страниц, картинки, запросов к api). Добавьте логирование приходящих запросов.
   * [django logger](https://docs.djangoproject.com/en/2.1/topics/logging/)
   * [express logger (middleware)](https://github.com/telefonica/node-express-logging)
   * [C# NLog](https://github.com/NLog/NLog/wiki/Tutorial)

 * скорость на `/`:
```shell
Server Software:        uvicorn
Server Hostname:        0.0.0.0
Server Port:            8080

Document Path:          /
Document Length:        164 bytes

Concurrency Level:      10
Time taken for tests:   1.384 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      317000 bytes
HTML transferred:       164000 bytes
Requests per second:    722.32 [#/sec] (mean)
Time per request:       13.844 [ms] (mean)
Time per request:       1.384 [ms] (mean, across all concurrent requests)
Transfer rate:          223.61 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:     3   14   2.0     13      30
Waiting:        3   10   3.0     10      29
Total:          4   14   2.0     13      30

Percentage of the requests served within a certain time (ms)
  50%     13
  66%     14
  75%     14
  80%     15
  90%     15
  95%     16
  98%     17
  99%     30
 100%     30 (longest request)
```

 * скорость на `/static/hack`:
```shell
Server Software:        uvicorn
Server Hostname:        0.0.0.0
Server Port:            8080

Document Path:          /hack
Document Length:        189 bytes

Concurrency Level:      10
Time taken for tests:   1.383 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      342000 bytes
HTML transferred:       189000 bytes
Requests per second:    723.04 [#/sec] (mean)
Time per request:       13.830 [ms] (mean)
Time per request:       1.383 [ms] (mean, across all concurrent requests)
Transfer rate:          241.49 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:     3   14   1.3     13      19
Waiting:        2    9   2.9      9      18
Total:          3   14   1.3     13      19

Percentage of the requests served within a certain time (ms)
  50%     13
  66%     14
  75%     14
  80%     15
  90%     15
  95%     16
  98%     18
  99%     19
 100%     19 (longest request)
```

* скорость на `/static/index`:
```shell
Server Software:        uvicorn
Server Hostname:        0.0.0.0
Server Port:            8080

Document Path:          /index
Document Length:        189 bytes

Concurrency Level:      10
Time taken for tests:   1.432 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      342000 bytes
HTML transferred:       189000 bytes
Requests per second:    698.53 [#/sec] (mean)
Time per request:       14.316 [ms] (mean)
Time per request:       1.432 [ms] (mean, across all concurrent requests)
Transfer rate:          233.30 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       1
Processing:     6   14   1.5     14      22
Waiting:        4   11   2.4     11      21
Total:          7   14   1.5     14      22

Percentage of the requests served within a certain time (ms)
  50%     14
  66%     14
  75%     15
  80%     15
  90%     16
  95%     17
  98%     17
  99%     21
 100%     22 (longest request)
```

 * скорость на `/api/v1/movies/`:
```shell
Server Software:        uvicorn
Server Hostname:        0.0.0.0
Server Port:            8080

Document Path:          /api/v1/movies
Document Length:        0 bytes

Concurrency Level:      10
Time taken for tests:   1.377 seconds
Complete requests:      1000
Failed requests:        0
Non-2xx responses:      1000
Total transferred:      154000 bytes
HTML transferred:       0 bytes
Requests per second:    726.44 [#/sec] (mean)
Time per request:       13.766 [ms] (mean)
Time per request:       1.377 [ms] (mean, across all concurrent requests)
Transfer rate:          109.25 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:     2   14   1.6     13      29
Waiting:        2    9   2.7      9      19
Total:          2   14   1.6     13      29

Percentage of the requests served within a certain time (ms)
  50%     13
  66%     14
  75%     15
  80%     15
  90%     16
  95%     16
  98%     17
  99%     18
 100%     29 (longest request)
```

 * скорость на `/api/v1/movies/8`:
```shell
Server Software:        uvicorn
Server Hostname:        0.0.0.0
Server Port:            8080

Document Path:          /api/v1/movies/2
Document Length:        143 bytes

Concurrency Level:      10
Time taken for tests:   2.864 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      288000 bytes
HTML transferred:       143000 bytes
Requests per second:    349.15 [#/sec] (mean)
Time per request:       28.641 [ms] (mean)
Time per request:       2.864 [ms] (mean, across all concurrent requests)
Transfer rate:          98.20 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     4   28  48.9     24     624
Waiting:        4   27  49.0     22     623
Total:          4   28  49.0     24     624

Percentage of the requests served within a certain time (ms)
  50%     24
  66%     25
  75%     26
  80%     27
  90%     30
  95%     33
  98%     37
  99%     41
 100%    624 (longest request)
```


Реализовано логирование приходящих запросов с сохранением в файл при помощи библиотеки [loguru](https://github.com/Delgan/loguru).
Логи сохраняются в файл по адресу `/var/logs` внутри контейнера с API.


2. Сконфигурируйте `nginx` сервер таким образом, чтобы запросы проходили через `nginx` и перенаправлялись на сервер из лабораторной работы №1.
   * [Гайд для начинающих](https://nginx.org/ru/docs/beginners_guide.html)


Сконфигурирован `nginx` сервер. Содержимое конфигурационного файла:
```shell
worker_processes 1;

events {
  worker_connections 1024; # increase if you have lots of clients
  accept_mutex off; # set to 'on' if nginx worker_processes > 1
}

http {
  include mime.types;
  default_type application/octet-stream;
  access_log /var/log/nginx/access.log combined;
  sendfile on;

    server {
        listen   80;
        server_name  localhost;

        location ^~ / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_redirect off;
            proxy_buffering off;
            proxy_pass http://movie_api:8080/;
        }
    }

}
```
Запросы проходят через `nginx` (адрес `http://0.0.0.0:80`) и перенаправляются на сервер `uvicorn` по адресу `http://0.0.0.0:8080`.
В заголовка отображается Сервер - `nginx/1.19.8`


3. Используйте `nginx` для отдачи статического контента. Как изменилось время ответа сервера?

Для раздачи статического контента через `nginx` были внесены следующие изменения в конфигурационный файл:
```shell
        location /html/ {
            root /static;
        }

        location /img/ {
            root /static;
        }
```

Скорость значительно выросла, статика отдаётся молниеносно:
```shell
Server Software:        nginx/1.19.8
Server Hostname:        0.0.0.0
Server Port:            80

Document Path:          /html/index.html
Document Length:        190 bytes

Concurrency Level:      10
Time taken for tests:   0.088 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      422000 bytes
HTML transferred:       190000 bytes
Requests per second:    11319.39 [#/sec] (mean)
Time per request:       0.883 [ms] (mean)
Time per request:       0.088 [ms] (mean, across all concurrent requests)
Transfer rate:          4664.83 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:     0    1   0.2      1       3
Waiting:        0    1   0.2      1       3
Total:          0    1   0.2      1       3

Percentage of the requests served within a certain time (ms)
  50%      1
  66%      1
  75%      1
  80%      1
  90%      1
  95%      1
  98%      1
  99%      2
 100%      3 (longest request)
```

Протестируем скорость отдачи отдельного изображения 
(пригодится для сравнения скорости ответа после применения сжатия и кэширования)
```shell
Server Software:        nginx/1.19.8
Server Hostname:        0.0.0.0
Server Port:            80

Document Path:          /img/robo.png
Document Length:        771709 bytes

Concurrency Level:      10
Time taken for tests:   0.675 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      771947000 bytes
HTML transferred:       771709000 bytes
Requests per second:    1481.07 [#/sec] (mean)
Time per request:       6.752 [ms] (mean)
Time per request:       0.675 [ms] (mean, across all concurrent requests)
Transfer rate:          1116508.85 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     1    7   1.1      7      12
Waiting:        0    6   0.9      6       9
Total:          1    7   1.1      7      12

Percentage of the requests served within a certain time (ms)
  50%      7
  66%      7
  75%      7
  80%      7
  90%      8
  95%      8
  98%     10
  99%     10
 100%     12 (longest request)
```

4. Настройте кеширование и `gzip` сжатие файлов.  Как изменилось время ответа сервера?
   * [Настройка gzip сжатия](https://ruhighload.com/%D0%9A%D0%B0%D0%BA+%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C+gzip+%D0%B2+nginx%3F)
   * [Гайд по настройке кеширования](https://ruhighload.com/post/%D0%9A%D1%8D%D1%88%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5+%D1%81+Nginx)

Для настройки кеширования и сжатия были внесены следующие изменения в конфигурационный файл:
```shell
   server {
       gzip on;
       gzip_types      text/plain application/xml;
       gzip_proxied    no-cache no-store private expired auth;
       gzip_min_length 1000;
       ...
   }
        location /html/ {
            gzip_static on;
            # cache
            expires 30d;
            add_header Vary Accept-Encoding;
            access_log off;
            ...
        }

        location /img/ {
            gzip_static on;
            # cache
            expires 30d;
            add_header Vary Accept-Encoding;
            access_log off;
            ...
        }
```

Скорость, хотя и не значительно, выросла:
```shell
Server Software:        nginx/1.19.8
Server Hostname:        0.0.0.0
Server Port:            80

Document Path:          /html/index.html
Document Length:        190 bytes

Concurrency Level:      10
Time taken for tests:   0.077 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      517000 bytes
HTML transferred:       190000 bytes
Requests per second:    13057.90 [#/sec] (mean)
Time per request:       0.766 [ms] (mean)
Time per request:       0.077 [ms] (mean, across all concurrent requests)
Transfer rate:          6592.71 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       1
Processing:     0    1   0.2      1       2
Waiting:        0    1   0.2      1       2
Total:          0    1   0.2      1       3

Percentage of the requests served within a certain time (ms)
  50%      1
  66%      1
  75%      1
  80%      1
  90%      1
  95%      1
  98%      2
  99%      2
 100%      3 (longest request)
```

Изображение тоже немного быстрее отдаёт:
```shell
Server Software:        nginx/1.19.8
Server Hostname:        0.0.0.0
Server Port:            80

Document Path:          /img/robo.png
Document Length:        771709 bytes

Concurrency Level:      10
Time taken for tests:   0.624 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      772042000 bytes
HTML transferred:       771709000 bytes
Requests per second:    1602.90 [#/sec] (mean)
Time per request:       6.239 [ms] (mean)
Time per request:       0.624 [ms] (mean, across all concurrent requests)
Transfer rate:          1208502.53 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       1
Processing:     3    6   0.8      6      10
Waiting:        1    5   0.8      5       7
Total:          3    6   0.8      6      10

Percentage of the requests served within a certain time (ms)
  50%      6
  66%      6
  75%      7
  80%      7
  90%      7
  95%      8
  98%      8
  99%      8
 100%     10 (longest request)
```

5. Запустите еще 2 инстанса вашего сервера из лабораторной работы №1, настройте перенаправление таким образом, чтобы на серверы приходили запросы в соотношении 3:1:1. 
   * [Гайд по настройке балансировки.](https://ruhighload.com/%D0%91%D0%B0%D0%BB%D0%B0%D0%BD%D1%81%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0+%D0%B1%D1%8D%D0%BA%D0%B5%D0%BD%D0%B4%D0%BE%D0%B2+%D1%81+%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E+nginx)

В двух отдельных контейнерах запущено ещё 2 инстанса сервера API. 
В соотношении 3:1:1 настроена балансировка, для этого внесены следующие изменения в конфигурационный файл `nginx`:
```shell
worker_processes 3;

events {
    worker_connections 1024; 
    accept_mutex on;
}

http {
    ...
    client_header_timeout 3m;
    client_body_timeout 3m;
    send_timeout 3m;
    ...

    upstream api {
        server 192.168.224.2:8080 weight=3;
        server 192.168.224.3:8080 weight=1;
        server 192.168.224.4:8080 weight=1;
    }
    
    Server {
    ...
       location ^~ / {
               ...
               proxy_pass http://api;
           }
     }
```


6. Напишите еще два мини-сервера. Каждый из них должен обрабатывать два GET-запроса.
   * по `/` отдавать страницу с надписью “Добро пожаловать на сервис #1/#2” и ссылкой, ведущей на /temp
   * по `/temp`  возвращать произвольный контент

Написаны ещё два мини сервера в соответствии с ТЗ.
* 1-й тут - `http://0.0.0.0:8081/`
* 2-й тут - `http://0.0.0.0:8082/`

Настройте nginx так, чтобы в дополнение к п.1-5 он перенаправлял запросы по url `/service1` и `/service2` на соответствующие сервера. 

Перенаправление на два новых сервиса настроены, 
для этого внесены изменения в конфигурационный файл `nginx`:
```shell
        location /service1 {
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_redirect off;
            proxy_buffering off;
            proxy_pass http://service_1:8081/;
        }

            location /service2 {
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_redirect off;
            proxy_buffering off;
            proxy_pass http://service_2:8082/;
        }

            location /temp1/ {
            gzip_static on;
            # cache
            expires 30d;
            add_header Vary Accept-Encoding;
            access_log off;
            proxy_pass http://service_1:8081/temp1;
        }

            location /temp2/ {
            gzip_static on;
            # cache
            expires 30d;
            add_header Vary Accept-Encoding;
            access_log off;
            proxy_pass http://service_2:8082/temp2;
        }
```

7. Настройте отдачу страницы о состоянии сервера
   * [nginx status](https://nginx.org/ru/docs/http/ngx_http_stub_status_module.html)

Настроена страница о состоянии сервера, отображается следующая информация:
````shell
Active connections: 2 
server accepts handled requests
 7 7 29 
Reading: 0 Writing: 1 Waiting: 1 
````

Дополнительные задания:

```shell
Доп. задания пока не смотрел, но если останется время после других лаб - обязательно взгляну =)
```

1. Настройте `https` порт на сервере `nginx`. Используйте самоподписанный сертификат. ([Создание сертификата](https://letsencrypt.org/docs/certificates-for-localhost/))

Настроен порт `https`, для этого внесены изменения в конфигурационный файл `nginx`:
```shell
    server {
        ...
        listen              443 ssl;
        ...
        ssl_certificate     /etc/nginx/ssl/localhost.crt;
        ssl_certificate_key /etc/nginx/ssl/localhost.key;
        ...
    }
```

2. Добавьте `ServerPush` картинки для страницы `index.html`. Как изменилось время ответа сервера и загрузки страницы?

Добавлен `ServerPush`, для этого внесены изменения в конфигурационный файл `nginx`:
```shell
    ...
    server {
        ...
        listen              443 ssl http2;

        root /static/html;
        location = /index.html {
            http2_push /cat.jpeg;
        }
        ...
    }
```

3. Для повышения уровня безопасности необходимо скрывать внутреннюю реализацию вашего сервера. Скройте все заголовки `Server` (`nginx` можно оставить) из `header` ответа, а также дополнительные заголовки, которые дописывает ваш сервер, если есть.

Скрыты заголовки `Server`, для этого внесены изменения в конфигурационный файл `nginx`:
```shell
...
http {
    server_tokens   off;
...
```