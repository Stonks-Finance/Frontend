# Stonks Finance Frontend
![](./readme_images/stonks-image.jpg)

The `Frontend` for **Stonks Finance** provides an intuitive and engaging user interface for visualizing stock data, analyzing trends, and exploring AI-powered predictions. Built with **ReactJS**, this frontend integrates seamlessly with the backend microservices, offering a smooth user experience. It also features a fun and dynamic UI that incorporates the popular "Stonks" meme to depict stock performance.

## Features
- **Interactive Stock Data Visualizations**: Display real-time stock changes.
- **AI Predictions**: Show future stock performance based on AI models.
- **Dynamic Stock Modes**:
  - **Stonks Mode**: Indicates increasing stock values.
  - **Panic Mode**: Indicates decreasing stock values.

## Architecture
The frontend communicates with:
- **ms-main**: API Gateway that routes requests to appropriate backend services.
- **AI Microservice**: Provides stock data and predictions.

## Getting Started

### Prerequisites
Ensure the following are installed on your machine:
- **Node.js** (v16 or later)
- **Docker** 

### Clone the Repository
```bash
git clone https://github.com/Stonks-Finance/Frontend.git
cd Frontend
```

### Run the Application

#### Locally
Install the dependencies, and then run the application by the following commands: 
```bash
npm install
npm start
```

#### Using Docker
1. Build the Docker image:
   ```bash
   docker build -t stonks-frontend .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 --name stonks-frontend stonks-frontend
   ```

The application will be accessible at `http://localhost:3000`.

## CI/CD Part
This project includes CI/CD also. It is continuously deploying to the **Render**, using **Github Actions**. If you want to see URL of this microservice, you can just go to <a href="https://ms-main.onrender.com/">https://ms-main.onrender.com/</a>. 

But you should consider one thing, that this project uses Render freely. And because of that, the requests can delay 50 seconds or more. It is something about Render Policy. It says : 

<i>
Free instances spin down after periods of inactivity. They do not support SSH access, scaling, one-off jobs, or persistent disks. Select any paid instance type to enable these features.
</i>

## Contributing
Contributions are welcome! Follow these steps to contribute:
* Fork the project.
* Create a new branch: `git checkout -b feature/your-feature`. 
* Add your new features.
* Submit a pull request. 

## Thanks for your attention! 