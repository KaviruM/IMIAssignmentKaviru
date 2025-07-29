import React from 'react'
import { useRef, useState } from 'react'
import './Assignment_21.css'

function Assignment_21() {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(false);
    const [selectedColor, setSelectedColor] = useState({r: 0, g: 0, b: 0});
    const [showColor, setShowColor] = useState(false);

    const handleUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }

        const objectURL = URL.createObjectURL(file);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            setImage(true);
            URL.revokeObjectURL(objectURL);
        };
        
        img.src = objectURL;
    };

    const handleCanvasClick = (event) => {
        if (!image) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        // Alternative method 1: Using offsetX and offsetY
        const x = Math.floor(event.offsetX);
        const y = Math.floor(event.offsetY);
        
        const imageData = ctx.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        
        const color = {
            r: pixel[0],
            g: pixel[1],
            b: pixel[2]
        };
        
        setSelectedColor(color);
        setShowColor(true);
    };

    const rgbToHex = (r, g, b) => {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const handleReset = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setImage(false);
        setShowColor(false);
        setSelectedColor({r: 0, g: 0, b: 0});
    };

    const rgbString = `rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`;
    const hexString = rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b);

    return (
        <div className="assignment-container">
            <h1>Assignment 21 - Color Picker</h1>
            
            <div className="controls">
                <button onClick={handleUpload}>Upload Image</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="file-input"
                onChange={handleFileChange}
            />
            
            <div className="instruction-text">
                {image ? (
                    <p>Click on the image to pick colors</p>
                ) : (
                    <p>Upload an image to start</p>
                )}
            </div>
            
            <div className="canvas-container">
                <canvas 
                    ref={canvasRef} 
                    onClick={handleCanvasClick}
                    style={{ 
                        cursor: image ? 'crosshair' : 'default',
                        display: image ? 'block' : 'none'
                    }}
                />
            </div>
            
            {showColor && (
                <div className="color-display">
                    <div className="color-info">
                        <div className="color-preview">
                            <p>Color Preview</p>
                            <div 
                                className="color-swatch"
                                style={{ backgroundColor: rgbString }}
                            ></div>
                        </div>
                        
                        <div className="color-values">
                            <p><strong>RGB:</strong> {rgbString}</p>
                            <p><strong>HEX:</strong> {hexString}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Assignment_21