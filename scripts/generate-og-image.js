const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a 1200x630 canvas
const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#F7F9F7');
gradient.addColorStop(1, '#E8F5E8');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1200, 630);

// Colors
const primaryGreen = '#28A745';
const darkGreen = '#014421';
const lightBg = '#F7F9F7';

// Large background robot icon (decorative, low opacity)
ctx.save();
ctx.globalAlpha = 0.08;
ctx.translate(850, 250);
// Head
ctx.fillStyle = darkGreen;
ctx.beginPath();
ctx.arc(0, 0, 80, 0, Math.PI * 2);
ctx.fill();
// Body
ctx.fillRect(-50, 40, 100, 60);
// Eyes (white)
ctx.fillStyle = lightBg;
ctx.beginPath();
ctx.arc(-25, -10, 12, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(25, -10, 12, 0, Math.PI * 2);
ctx.fill();
ctx.restore();

// Main logo icon
ctx.save();
ctx.translate(140, 240);
// Circle background
ctx.fillStyle = primaryGreen;
ctx.beginPath();
ctx.arc(0, 0, 35, 0, Math.PI * 2);
ctx.fill();
// Robot face
ctx.fillStyle = 'white';
ctx.fillRect(-20, -15, 40, 30);
// Eyes
ctx.fillStyle = darkGreen;
ctx.beginPath();
ctx.arc(-12, -5, 4, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(12, -5, 4, 0, Math.PI * 2);
ctx.fill();
// Mouth
ctx.fillRect(-8, 5, 16, 3);
ctx.restore();

// Main text
ctx.fillStyle = darkGreen;
ctx.font = 'bold 56px sans-serif';
ctx.fillText('AgentMastery', 200, 250);

// Tagline
ctx.globalAlpha = 0.8;
ctx.font = '24px sans-serif';
ctx.fillText('Master AI Tools & Automation', 200, 300);
ctx.globalAlpha = 1;

// Bottom icons and text
ctx.save();
ctx.translate(100, 450);

// Chart icon
ctx.fillStyle = primaryGreen;
ctx.fillRect(0, 30, 8, 20);
ctx.fillRect(12, 20, 8, 30);
ctx.fillRect(24, 10, 8, 40);
ctx.fillRect(36, 15, 8, 35);

// Gear icon
ctx.save();
ctx.translate(100, 25);
ctx.strokeStyle = primaryGreen;
ctx.lineWidth = 3;
ctx.beginPath();
ctx.arc(0, 0, 12, 0, Math.PI * 2);
ctx.stroke();
ctx.fillStyle = primaryGreen;
ctx.beginPath();
ctx.arc(0, 0, 6, 0, Math.PI * 2);
ctx.fill();
// Gear teeth
ctx.fillRect(-2, -20, 4, 8);
ctx.fillRect(-2, 12, 4, 8);
ctx.fillRect(-20, -2, 8, 4);
ctx.fillRect(12, -2, 8, 4);
ctx.restore();

// Automation arrows
ctx.save();
ctx.translate(180, 30);
ctx.strokeStyle = primaryGreen;
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
// First arrow
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(20, 0);
ctx.moveTo(20, 0);
ctx.lineTo(15, -5);
ctx.moveTo(20, 0);
ctx.lineTo(15, 5);
ctx.stroke();
// Second arrow
ctx.beginPath();
ctx.moveTo(30, 0);
ctx.lineTo(50, 0);
ctx.moveTo(50, 0);
ctx.lineTo(45, -5);
ctx.moveTo(50, 0);
ctx.lineTo(45, 5);
ctx.stroke();
ctx.restore();

// Description text
ctx.fillStyle = darkGreen;
ctx.globalAlpha = 0.7;
ctx.font = '18px sans-serif';
ctx.fillText('Independent Rankings • Practical Playbooks • Interactive Tools', 250, 25);
ctx.restore();

// Decorative corner circles
ctx.globalAlpha = 0.1;
ctx.fillStyle = primaryGreen;
// Top right
ctx.beginPath();
ctx.arc(1100, 100, 60, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(1150, 50, 40, 0, Math.PI * 2);
ctx.fill();
// Bottom left
ctx.beginPath();
ctx.arc(100, 530, 60, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(50, 580, 40, 0, Math.PI * 2);
ctx.fill();

// Border
ctx.globalAlpha = 0.1;
ctx.strokeStyle = darkGreen;
ctx.lineWidth = 1;
ctx.strokeRect(2, 2, 1196, 626);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, '../public/og-image.png'), buffer);

// Also save as JPEG
const jpegBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
fs.writeFileSync(path.join(__dirname, '../public/og-image.jpg'), jpegBuffer);

console.log('Open Graph images generated successfully!');
console.log('- /public/og-image.png');
console.log('- /public/og-image.jpg');