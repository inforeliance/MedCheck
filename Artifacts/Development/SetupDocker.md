# MedCheck 

## Docker Setup
On Windows you should run docker commands inside `boot2docker` or a similar system.

- Clone the git repo: `git clone https://github.com/inforeliance/MedCheck`
- In the `MedCheck/Source` directory, run `docker build -t inforeliance/medcheck .`. The first run will take a while.
- Start a mongo container with `docker run -d --name medcheckdb mongo`
- Start the MedCheck container you just built with `docker run -d --name medcheck --link medcheckdb:db -p 9000:9000 inforeliance/medcheck`
- You should be able to visit the MedCheck web UI in a browser (for me, it's at `http://192.168.59.103:9000`) on port 9000