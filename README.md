# Frontend for Stock Finance 

For running the application inside docker, run the following commands : 

```sh
# Build the Docker image
docker build -t react-app .

# Run the Docker container
docker run -d --name stock-finance-react -p 3000:80 react-app
```
