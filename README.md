
**安装docker**
```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

sudo usermod -aG docker ops
```

**安装postgresql**
```
docker run -d \
  --name postgresql \
  -e POSTGRES_PASSWORD=Ze5l#uq7 \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v ~/postgresql:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:12
```

**安装postgresql客户端下载地址**  
https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v5.2/windows/pgadmin4-5.2-x64.exe

创建数据库omnidb

**venv环境**  
```
#ubuntu18
sudo apt-get install python3-venv

cd OmniDB
python3 -m venv omnidb_venv

sh omnidb_venv/bin/activate
```

**运行**
```
#ubuntu18 
sudo apt install libpq-dev libldap2-dev libsasl2-dev python3-dev
python3 -m pip install -U pip
pip3 install -r requirements.txt 

cd Omnidb
./omnidb-server.py -p 8080 -H 0.0.0.0
```