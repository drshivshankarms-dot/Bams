# Ayurveez: BAMS Made Easy

Ayurveez is a comprehensive educational platform designed for BAMS (Bachelor of Ayurvedic Medicine and Surgery) students. It features a structured curriculum, course management, and an AI-powered Ayurvedic clinical assistant.

## Features

- **Curriculum Management**: Structured content for 1st, 2nd, and 3rd Professionals.
- **Secure Access**: Simulation of a payment and access code unlock system.
- **AI Clinical Assistant**: A chatbot powered by Google Gemini API to answer Ayurvedic and clinical queries.
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop compatibility.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (Gemini 2.5 Flash)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ayurveez.git
   cd ayurveez
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Environment Variables:
   Create a `.env` file in the root directory and add your Google Gemini API Key:
   ```env
   API_KEY=your_google_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src` or root: Contains the React application logic.
- `constants.ts`: Curriculum data and configuration constants.
- `services/geminiService.ts`: AI integration logic.
- `components/`: Reusable UI components.

## License

This project is for educational purposes.
