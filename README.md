# Automatic Email Sender

An automated email sender built with Node.js and Express, designed to send personalized emails with attachments to multiple recipients. It supports HTML and plain text templates, template variables, and uses SMTP for sending emails. Ideal for sending CVs or bulk emails in a controlled way.

## Table of Contents
- [Key Features](#key-features)
- [Technical Requirements](#technical-requirements)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Template Variables](#template-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Key Features
- **Automated Email Sending**: Send emails directly from a web interface or API.
- **HTML & Plain Text Templates**: Full HTML emails with fallback to text.
- **Attachment Support**: Send CVs or any file as attachment.
- **Custom Variables**: Replace placeholders like `{{name}}`, `{{phone}}`, `{{portfolio}}`, `{{github}}`.
- **SMTP Compatible**: Works with Gmail, Outlook, or any SMTP server.
- **API Key Protection**: Simple API key check to prevent unauthorized use.
- **Front-end Interface**: List of recipients with a single “Send CV” button.

## Technical Requirements
- **Node.js**: 20.x
- **Express.js**: 4.x
- **Nodemailer**: 6.x
- **CORS**: 2.x
- **TailwindCSS**: CDN for frontend styling
- **Other Tools**:
  - `dotenv` for environment variables
  - `fs` and `path` for file handling

## Prerequisites
- Node.js and npm installed
- SMTP credentials (Gmail, Outlook, etc.)
- CV file placed in `cv/` folder
- Templates and variables prepared in `templates/` folder
- API key set in `.env` file

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/geraldgnika/auto-email-sender.git
   cd automatic-email-sender
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file with SMTP details and API key.

## Running the Application
1. Start the server:
   ```bash
   npm start
   ```
2. Access the front-end:
   ```
   http://localhost:3000
   ```
3. Click "Send Email" next to any recipient to send the email.

## Template Variables
The following variables can be used in your templates (`email.html`, `email.txt`, `subject.txt`):

- `{{name}}` – recipient name  
- `{{phone}}` – your phone number  
- `{{portfolio}}` – your portfolio link  
- `{{github}}` – your GitHub profile  

Example subject template (`subject.txt`):
```
Kerkese per mundesi punesimi – Web Developer
```

Example HTML/email body uses `{{name}}`, `{{phone}}`, `{{portfolio}}`, `{{github}`.

## Testing
- Add a small sample `companies.json` in `public/`:
```json
[
  { "name": "Company A", "email": "test@example.com" },
  { "name": "Company B", "email": "test@example.com" }
]
```
- Start the server and use the front-end to send emails to verify template replacements and attachments.

## Contributing
Pull requests are welcome. For significant changes, open an issue first to discuss your plan.

## License
MIT License. Copyright (c) Gerald Nika