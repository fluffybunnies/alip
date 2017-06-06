# alip


<!--

Note: Create ubuntu 14.04, 16 does not have all apt-get packages yet


#### Step 1: Copy Site

# Deploy static-bak to fresh instance
./index.sh _deploy --target=ec2-54-145-164-143.compute-1.amazonaws.com
./signal.sh static-bak --target=ec2-54-145-164-143.compute-1.amazonaws.com

# Set up instance for copy
ssh ubuntu@ec2-54-145-164-143.compute-1.amazonaws.com
sudo -i
crontab -e
# comment out crons

# Edit config
cd /var/www/static-bak
vim config.local.sh
```
export SITE='www.danielcaesar.com'
export S3_BUCKET='xxx'
export S3_KEY_PREFIX='xxx'
```

# Run copy script
/var/www/static-bak/bin/update.sh

# Update nginx config server_name
vim /etc/nginx/sites-enabled/static-bak
# Also comment out all the fastcgi stuff
# Reload cnf
/etc/init.d/nginx reload

# View instance in browser, sanity check all good
wopen http://ec2-54-145-164-143.compute-1.amazonaws.com



#### Step 2: Download Files To Repo

# From instance:
tar -zcvf /tmp/alip.tar.gz /var/www/static-bak/sites/www.danielcaesar.com
# From local:
scp ubuntu@ec2-54-145-164-143.compute-1.amazonaws.com:/tmp/alip.tar.gz ~/Dropbox/Beachmint/alip/~alip.tar.gz



#### Step 3: Test Deployment

./index.sh _deploy --target=ec2-184-73-138-130.compute-1.amazonaws.com
./signal.sh alip --target=ec2-184-73-138-130.compute-1.amazonaws.com



#### Step 4: Localize

- Get links like /contact to work (nginx?)
- Replace FB + GA
- Replace references to danielcaesar.com


-->