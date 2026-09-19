# SumoXPypsa - Project Structure

## Overview
Volta simulation system integrating PyPSA power flow analysis, SUMO traffic simulation, and V2G energy trading.

## Directory Structure

```
SumoXPypsa/
├── 📁 core/                          # Core system modules
│   ├── power_system.py               # PyPSA power grid implementation
│   ├── sumo_manager.py               # SUMO integration wrapper
│   └── ...                           # Other core modules
│
├── 📁 config/                        # Configuration modules
│   ├── settings.py                   # Application settings
│   ├── database.py                   # Database configuration
│   └── logging.py                    # Logging configuration
│
├── 📁 static/                        # Web frontend assets
│   ├── styles.css                    # Main stylesheet
│   ├── script.js                     # Core JavaScript
│   └── world-class-map.js            # Mapbox integration
│
├── 📁 data/                          # Data files and configurations
│   ├── manhattan.net.xml             # SUMO network file
│   ├── manhattan.sumocfg             # SUMO configuration
│   └── ...                           # Other data files
│
├── 📁 docs/                          # Documentation
│   ├── QUICK_START.md                # Quick start guide
│   ├── AI_SYSTEM_README.md           # AI system documentation
│   └── images/                       # Documentation images
│
├── 📁 tests/                         # Test suites
│   ├── test_scenario_api.py          # Scenario API tests
│   └── test_full_system.py           # Full system integration tests
│
├── 📄 main_complete_integration.py   # Main application entry point
├── 📄 integrated_backend.py          # Backend system integration
├── 📄 v2g_manager.py                 # Vehicle-to-Grid manager
├── 📄 ml_engine.py                   # Machine learning engine
├── 📄 ai_chatbot.py                  # AI chatbot system
├── 📄 requirements.txt               # Python dependencies
├── 📄 .env.example                   # Environment configuration example
├── 📄 .gitignore                     # Git ignore rules
├── 📄 README.md                      # Project README
├── 📄 LICENSE                        # MIT License
└── 📄 docker-compose.yml             # Docker composition
```

## Core Components

### Main Application
- **main_complete_integration.py**: Entry point that initializes all systems

### Power System
- **core/power_system.py**: PyPSA-based power grid with 8 substations
- **integrated_backend.py**: Distribution network (13.8kV/480V)

### Vehicle & V2G
- **manhattan_sumo_manager.py**: SUMO traffic simulation
- **v2g_manager.py**: Vehicle-to-Grid energy trading

### AI & ML
- **ml_engine.py**: Machine learning for demand prediction
- **ai_chatbot.py**: AI assistant for grid operations

## Installation

See docs/QUICK_START.md for detailed installation instructions.

## License
MIT License - See LICENSE file
