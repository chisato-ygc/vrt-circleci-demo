#!/usr/bin/env python3
"""
VRT CircleCI Demo Application
A Flask web app for demonstrating Visual Regression Testing with CircleCI
"""

from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'vrt-demo-secret-key')


@app.route('/')
def home():
    """Homepage with hero section and cards"""
    return render_template('home.html', page='home')


@app.route('/dashboard')
def dashboard():
    """Dashboard with stats and charts"""
    stats = {
        'users': 1234,
        'revenue': 45678,
        'growth': 23.5,
        'satisfaction': 98.2
    }
    return render_template('dashboard.html', page='dashboard', stats=stats)


@app.route('/profile')
def profile():
    """User profile page"""
    user = {
        'name': 'Chisato Yaguchi',
        'email': 'chisato@example.com',
        'role': 'DevOps Engineer',
        'joined': 'September 2025',
        'projects': 12,
        'contributions': 456
    }
    return render_template('profile.html', page='profile', user=user)


@app.route('/api/health')
def health():
    """Health check endpoint for testing"""
    return jsonify({
        'status': 'healthy',
        'service': 'VRT Demo App',
        'version': '1.0.0'
    })


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    
    print(f"🚀 Starting VRT Demo App on http://localhost:{port}")
    print(f"📊 Dashboard: http://localhost:{port}/dashboard")
    print(f"👤 Profile: http://localhost:{port}/profile")
    
    app.run(host='0.0.0.0', port=port, debug=debug)

