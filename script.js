// Data structures from the original Python code
const PAD_X = 5;
const PAD_Y = 5;
const CIRCLE_SIZE = 12;

const DEFAULT_COLOR_SCHEME = {
    'BG_COLOR': '#333333',
    'TEXT_COLOR': '#FFFFFF',
    'ENTRY_BG': '#4C4C4C',
    'TEXT_BG': '#1D1D1D',
    'HIGHLIGHT_COLOR': 'black',
    'PRODUCE_COLOR': '#66B2FF',
    'CONSUME_COLOR': '#FFA500',
    'NUMBER_COLOR': '#66B2FF',
    'STORAGE_POSITIVE_COLOR': '#00FF00',
    'STORAGE_ZERO_COLOR': '#FFA500',
    'LABEL_COLOR': '#FFFFFF',
    'MODULE_COLOR': '#FFFFFF',
    'SURPLUS_COLOR': '#00FF00',
    'DEFICIT_COLOR': '#FF0000',
    'STORAGE_SIZE_COLOR': '#FFFFFF'
};

const WHITE_COLOR_SCHEME = {
    'BG_COLOR': '#333333',
    'TEXT_COLOR': '#FFFFFF',
    'ENTRY_BG': '#4C4C4C',
    'TEXT_BG': '#1D1D1D',
    'HIGHLIGHT_COLOR': 'black',
    'PRODUCE_COLOR': '#FFFFFF',
    'CONSUME_COLOR': '#FFFFFF',
    'NUMBER_COLOR': '#FFFFFF',
    'STORAGE_POSITIVE_COLOR': '#FFFFFF',
    'STORAGE_ZERO_COLOR': '#FFFFFF',
    'LABEL_COLOR': '#FFFFFF',
    'MODULE_COLOR': '#FFFFFF',
    'SURPLUS_COLOR': '#FFFFFF',
    'DEFICIT_COLOR': '#FFFFFF',
    'STORAGE_SIZE_COLOR': '#FFFFFF'
};

let current_color_scheme = DEFAULT_COLOR_SCHEME;

const storage_types = {
    "Solid": {
        "Small Storage": { "capacity": 100000, "name": "Small Solid Storage" },
        "Medium Storage": { "capacity": 500000, "name": "Medium Solid Storage" },
        "Large Storage": { "capacity": 1000000, "name": "Large Solid Storage" }
    },
    "Liquid": {
        "Small Storage": { "capacity": 100000, "name": "Small Liquid Storage" },
        "Medium Storage": { "capacity": 500000, "name": "Medium Liquid Storage" },
        "Large Storage": { "capacity": 1000000, "name": "Large Liquid Storage" }
    },
    "Container": {
        "Small Storage": { "capacity": 100000, "name": "Small Container Storage" },
        "Medium Storage": { "capacity": 500000, "name": "Medium Container Storage" },
        "Large Storage": { "capacity": 1000000, "name": "Large Container Storage" }
    }
};

const raw_resources = {
    "Methane": { "storage_use": 6, "storage_type": "Liquid" },
    "Ore": { "storage_use": 10, "storage_type": "Solid" },
    "Rhydonium": { "storage_use": 60, "storage_type": "Solid" },
    "Silicon": { "storage_use": 10, "storage_type": "Solid" },
    "Helium": { "storage_use": 6, "storage_type": "Liquid" },
    "Tibanna": { "storage_use": 6, "storage_type": "Liquid" },
    "Ice": { "storage_use": 8, "storage_type": "Solid" },
    "Raw Scrap": { "storage_use": 10, "storage_type": "Solid" }
};

const modules = {
    "Advanced Composites": {
        "produced": 1944,
        "needed": { "Energy Cells": 1800, "Graphene": 2880, "Refined Metals": 2880 },
        "storage_type": "Container",
        "storage_use_per_ware": 32,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Advanced Electronics": {
        "produced": 810,
        "needed": { "Energy Cells": 900, "Microchips": 660, "Capacitors": 300 },
        "storage_type": "Container",
        "storage_use_per_ware": 30,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Agricultural Goods": {
        "produced": 11160,
        "needed": { "Energy Cells": 2160, "Water": 2880 },
        "storage_type": "Container",
        "storage_use_per_ware": 4,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Antimatter Converters": {
        "produced": 4788,
        "needed": { "Advanced Composites": 720, "Energy Cells": 2880, "Microchips": 1080 },
        "storage_type": "Container",
        "storage_use_per_ware": 10,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Capacitors": {
        "produced": 1410,
        "needed": { "Energy Cells": 600, "Graphene": 1740, "Superfluid Coolant": 450 },
        "storage_type": "Container",
        "storage_use_per_ware": 22,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Brewery": {
        "produced": 2205,
        "needed": { "Energy Cells": 900, "Water": 2250, "Agricultural Goods": 1800 },
        "storage_type": "Container",
        "storage_use_per_ware": 2,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Droid Parts": {
        "produced": 945,
        "needed": { "Energy Cells": 540, "Engine Parts": 180, "Durasteel Plates": 180, "Microchips": 180, "Sensor Components": 360 },
        "storage_type": "Container",
        "storage_use_per_ware": 30,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Durasteel Plates": {
        "produced": 3528,
        "needed": { "Energy Cells": 640, "Graphene": 480, "Refined Metals": 3360 },
        "storage_type": "Container",
        "storage_use_per_ware": 12,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Energy Cells": [
        { 
            "produced": 31500,
            "needed": {},
            "storage_type": "Container",
            "storage_use_per_ware": 1,
            "raw_resources": [],
            "module_tag": "normal"
        },
        { 
            "produced": 24000,
            "needed": {},
            "storage_type": "Container",
            "storage_use_per_ware": 1,
            "raw_resources": [],
            "module_tag": "Imperial"
        }
    ],
    "Engine Parts": {
        "produced": 2496,
        "needed": { "Tibanna Cells": 1680, "Energy Cells": 720, "Refined Metals": 1152 },
        "storage_type": "Container",
        "storage_use_per_ware": 15,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Field Coils": {
        "produced": 3150,
        "needed": { "Energy Cells": 1080, "Plasma Conductors": 720, "Capacitors": 774 },
        "storage_type": "Container",
        "storage_use_per_ware": 15,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Food Rations": {
        "produced": 20700,
        "needed": { "Energy Cells": 4500, "Meat": 2250, "Spices": 2250, "Agricultural Goods": 2250 },
        "storage_type": "Container",
        "storage_use_per_ware": 1,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Graphene": {
        "produced": 4320,
        "needed": { "Energy Cells": 2400 },
        "storage_type": "Container",
        "storage_use_per_ware": 20,
        "raw_resources": [{"Methane": 14400}],
        "module_tag": "No Filter",
    },
    "Hutt Chem": {
        "produced": 2880,
        "needed": { "Energy Cells": 960, "Water": 2400 },
        "storage_type": "Container",
        "storage_use_per_ware": 6,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Hutt Spice": {
        "produced": 2160,
        "needed": { "Energy Cells": 2520, "Spices": 360 },
        "storage_type": "Container",
        "storage_use_per_ware": 3,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Medical Supplies": {
        "produced": 7488,
        "needed": { "Energy Cells": 3600, "Spices": 1440, "Water": 2160, "Agricultural Goods": 1080 },
        "storage_type": "Container",
        "storage_use_per_ware": 2,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Meat": {
        "produced": 6960,
        "needed": { "Energy Cells": 1920, "Water": 2400 },
        "storage_type": "Container",
        "storage_use_per_ware": 6,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Microchips": {
        "produced": 1296,
        "needed": { "Energy Cells": 900, "Silicon Wafers": 3600 },
        "storage_type": "Container",
        "storage_use_per_ware": 22,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Missile Components": {
        "produced": 3372,
        "needed": { "Advanced Composites": 24, "Energy Cells": 240, "Durasteel Plates": 24 },
        "storage_type": "Container",
        "storage_use_per_ware": 2,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Module Prefab": {
        "produced": 1296,
        "needed": { "Plasma Conductors": 600, "Energy Cells": 1680, "Microchips": 1920, "Capacitors": 1200 },
        "storage_type": "Container",
        "storage_use_per_ware": 24,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Plasma Conductors": {
        "produced": 528,
        "needed": { "Energy Cells": 720, "Graphene": 1152, "Superfluid Coolant": 1680 },
        "storage_type": "Container",
        "storage_use_per_ware": 32,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Refined Metals": {
        "produced": 6336,
        "needed": { "Energy Cells": 6480 },
        "storage_type": "Container",
        "storage_use_per_ware": 14,
        "raw_resources": [{"Ore": 17280}],
        "module_tag": "No Filter",
    },
    "Rhydonium Refinery": {
        "produced": 135,
        "needed": { "Energy Cells": 18000 },
        "storage_type": "Container",
        "storage_use_per_ware": 200,
        "raw_resources": [{"Rhydonium": 4050}],
        "module_tag": "No Filter",
    },
    "Scrap Metal": {
        "produced": 9000,
        "needed": { "Energy Cells": 90000 },
        "storage_type": "Container",
        "storage_use_per_ware": 10,
        "raw_resources": [{"Raw Scrap": 9000}],
        "module_tag": "No Filter",
    },
    "Scrap Recycler": {
        "produced": { "Module Prefab": 720, "Durasteel Plates": 1800 },
        "needed": { "Energy Cells": 111000, "Scrap Metal": 4500 },
        "storage_info": {
            "Module Prefab": { "storage_type": "Container", "storage_use_per_ware": 24 },
            "Durasteel Plates": { "storage_type": "Container", "storage_use_per_ware": 12 }
        },
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Ship Supplies": [
        { 
            "produced": 360,
            "needed": { "Food Rations": 2700, "Medical Supplies": 1800, "Refined Metals": 900, "Water": 900, "Energy Cells": 1800 },
            "storage_type": "Container",
            "storage_use_per_ware": 30,
            "raw_resources": [],
            "module_tag": "No Filter",
        },
        { 
            "produced": 360,
            "needed": { "Fibersteel": 360, "Energy Cells": 1800, "Bacta Solution": 432 },
            "storage_type": "Container",
            "storage_use_per_ware": 30,
            "raw_resources": [],
            "module_tag": "Sith",
        }
    ],
    "Shield Components": {
        "produced": 1737,
        "needed": { "Energy Cells": 630, "Plasma Conductors": 180, "Capacitors": 180 },
        "storage_type": "Container",
        "storage_use_per_ware": 10,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Darkfusion Cell": {
        "produced": 1200,
        "needed": { "Energy Cells": 48000 },
        "storage_type": "Container",
        "storage_use_per_ware": 18,
        "raw_resources": [{"Tibanna": 240000}, {"Ore": 36000}, {"Silicon": 36000}],
        "module_tag": "Sith",
    },
    "Fibersteel": {
        "produced": 8000,
        "needed": { "Energy Cells": 2000 },
        "storage_type": "Container",
        "storage_use_per_ware": 18,
        "raw_resources": [{"Helium": 5200}, {"Ore": 2000}],
        "module_tag": "Sith",
    },
    "Obsidian Composite": {
        "produced": 1200,
        "needed": { "Energy Cells": 4800, "Fibersteel": 48 },
        "storage_type": "Container",
        "storage_use_per_ware": 18,
        "raw_resources": [{"Methane": 9600}, {"Silicon": 7200}],
        "module_tag": "Sith",
    },
    "Bacta": {
        "produced": 5280,
        "needed": { "Energy Cells": 1920 },
        "storage_type": "Container",
        "storage_use_per_ware": 18,
        "raw_resources": [{"Ice": 1920}, {"Methane": 4800}],
        "module_tag": "Sith",
    },
    "Cloning Vats": {
        "produced": 1725,
        "needed": { "Energy Cells": 1800, "Bacta": 48 },
        "storage_type": "Container",
        "storage_use_per_ware": 18,
        "raw_resources": [],
        "module_tag": "Sith",
    },
    "Silicon Wafers": {
        "produced": 6420,
        "needed": { "Energy Cells": 5400 },
        "storage_type": "Container",
        "storage_use_per_ware": 18,
        "raw_resources": [{"Silicon": 14400}],
        "module_tag": "No Filter",
    },
    "Superfluid Coolant": {
        "produced": 4275,
        "needed": { "Energy Cells": 2700 },
        "storage_type": "Container",
        "storage_use_per_ware": 16,
        "raw_resources": [{"Helium": 14400}],
        "module_tag": "No Filter",
    },
    "Smart Chips": {
        "produced": 2574,
        "needed": { "Energy Cells": 900, "Silicon Wafers": 360 },
        "storage_type": "Container",
        "storage_use_per_ware": 2,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Spices": {
        "produced": 9000,
        "needed": { "Energy Cells": 720, "Water": 1440 },
        "storage_type": "Container",
        "storage_use_per_ware": 3,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Sensor Components": {
        "produced": 648,
        "needed": { "Energy Cells": 1080, "Refined Metals": 1800, "Silicon Wafers": 1080 },
        "storage_type": "Container",
        "storage_use_per_ware": 38,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Tibanna Cells": {
        "produced": 9000,
        "needed": { "Energy Cells": 9000 },
        "storage_type": "Container",
        "storage_use_per_ware": 18,
        "raw_resources": [{"Tibanna": 28800}],
        "module_tag": "No Filter",
    },
    "Turret Components": {
        "produced": 820,
        "needed": { "Energy Cells": 240, "Microchips": 80, "Sensor Components": 60, "Tibanna Cells": 90 },
        "storage_type": "Container",
        "storage_use_per_ware": 20,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Weapon Components": {
        "produced": 1020,
        "needed": { "Energy Cells": 360, "Durasteel Plates": 120, "Tibanna Cells": 360 },
        "storage_type": "Container",
        "storage_use_per_ware": 20,
        "raw_resources": [],
        "module_tag": "No Filter",
    },
    "Water": {
        "produced": 17370,
        "needed": { "Energy Cells": 5400 },
        "storage_type": "Container",
        "storage_use_per_ware": 6,
        "raw_resources": [{"Ice": 28800}],
        "module_tag": "No Filter",
    }
};

// Helper functions
function formatNumber(num) {
    if (typeof num === 'number') {
        return num === Math.round(num) ? Math.round(num) : Math.round(num * 100) / 100;
    }
    return num;
}

function hasSithVariant(moduleName) {
    const moduleData = modules[moduleName];
    if (Array.isArray(moduleData)) {
        return moduleData.some(variant => variant.module_tag === "Sith");
    }
    return false;
}

function isPureSith(moduleName) {
    const moduleData = modules[moduleName];
    if (typeof moduleData === 'object' && !Array.isArray(moduleData)) {
        return moduleData.module_tag === "Sith";
    }
    return false;
}

function hasImperialVariant(moduleName) {
    const moduleData = modules[moduleName];
    if (Array.isArray(moduleData)) {
        return moduleData.some(variant => variant.module_tag === "Imperial");
    }
    return false;
}

function hasNormalVariant(moduleName) {
    const moduleData = modules[moduleName];
    if (Array.isArray(moduleData)) {
        return moduleData.some(variant => ["No Filter", "Imperial"].includes(variant.module_tag));
    }
    return true;
}

function getModuleVariant(moduleName, filterTag = "No Filter") {
    const moduleData = modules[moduleName];
    
    if (!moduleData || typeof moduleData === 'object' && !Array.isArray(moduleData)) {
        return moduleData;
    }
    
    if (Array.isArray(moduleData)) {
        if (filterTag === "No Filter") {
            return moduleData[0];
        }
        
        const matchingVariant = moduleData.find(variant => variant.module_tag === filterTag);
        if (matchingVariant) return matchingVariant;
        
        return moduleData[0];
    }
    
    return null;
}

function getModuleVariantColors(moduleName) {
    if (isPureSith(moduleName)) {
        return ["red", "transparent"];
    }
    
    const colors = [];
    
    if (hasNormalVariant(moduleName)) {
        colors.push("white");
    } else {
        colors.push("transparent");
    }
        
    if (hasSithVariant(moduleName)) {
        colors.push("red");
    } else if (hasImperialVariant(moduleName)) {
        colors.push("orange");
    } else {
        colors.push("transparent");
    }
        
    return colors;
}

// DOM elements
const moduleDropdown = document.getElementById('module-dropdown');
const filterDropdown = document.getElementById('filter-dropdown');
const quantityInput = document.getElementById('quantity-input');
const sunlightInput = document.getElementById('sunlight-input');
const advancedCheckbox = document.getElementById('advanced-checkbox');
const calculateButton = document.getElementById('calculate-button');
const colorSchemeButton = document.getElementById('color-scheme-button');
const resultsText = document.getElementById('results-text');
const results2Text = document.getElementById('results2-text');
const totalText = document.getElementById('total-text');
const advancedText = document.getElementById('advanced-text');
const advancedText2 = document.getElementById('advanced-text2');
const advancedText3 = document.getElementById('advanced-text3');
const advancedText4 = document.getElementById('advanced-text4');
const advancedContainer = document.getElementById('advanced-container');

// Initialize the module dropdown
function initializeModuleDropdown() {
    // Get unique base module names (without variants)
    const baseModules = Object.keys(modules).sort();
    
    baseModules.forEach(module => {
        const option = document.createElement('option');
        option.value = module;
        option.textContent = module;
        
        // Add variant indicators
        const colors = getModuleVariantColors(module);
        if (colors.some(c => c !== "transparent")) {
            const circleContainer = document.createElement('span');
            circleContainer.className = 'circle-container';
            
            colors.forEach(color => {
                if (color !== "transparent") {
                    const circle = document.createElement('span');
                    circle.className = `circle ${color}`;
                    circleContainer.appendChild(circle);
                }
            });
            
            option.prepend(circleContainer);
        }
        
        moduleDropdown.appendChild(option);
    });
}

// Toggle color scheme
function toggleColorScheme() {
    if (current_color_scheme === DEFAULT_COLOR_SCHEME) {
        current_color_scheme = WHITE_COLOR_SCHEME;
        colorSchemeButton.textContent = "Color Scheme: White";
    } else {
        current_color_scheme = DEFAULT_COLOR_SCHEME;
        colorSchemeButton.textContent = "Color Scheme: Coloured";
    }
    
    updateColorScheme();
}

// Update color scheme
function updateColorScheme() {
    document.documentElement.style.setProperty('--bg-color', current_color_scheme.BG_COLOR);
    document.documentElement.style.setProperty('--text-color', current_color_scheme.TEXT_COLOR);
    document.documentElement.style.setProperty('--entry-bg', current_color_scheme.ENTRY_BG);
    document.documentElement.style.setProperty('--text-bg', current_color_scheme.TEXT_BG);
    document.documentElement.style.setProperty('--highlight-color', current_color_scheme.HIGHLIGHT_COLOR);
    document.documentElement.style.setProperty('--produce-color', current_color_scheme.PRODUCE_COLOR);
    document.documentElement.style.setProperty('--consume-color', current_color_scheme.CONSUME_COLOR);
    document.documentElement.style.setProperty('--number-color', current_color_scheme.NUMBER_COLOR);
    document.documentElement.style.setProperty('--storage-positive-color', current_color_scheme.STORAGE_POSITIVE_COLOR);
    document.documentElement.style.setProperty('--storage-zero-color', current_color_scheme.STORAGE_ZERO_COLOR);
    document.documentElement.style.setProperty('--label-color', current_color_scheme.LABEL_COLOR);
    document.documentElement.style.setProperty('--module-color', current_color_scheme.MODULE_COLOR);
    document.documentElement.style.setProperty('--surplus-color', current_color_scheme.SURPLUS_COLOR);
    document.documentElement.style.setProperty('--deficit-color', current_color_scheme.DEFICIT_COLOR);
    document.documentElement.style.setProperty('--storage-size-color', current_color_scheme.STORAGE_SIZE_COLOR);
}

// Toggle advanced view
function toggleAdvancedView() {
    advancedContainer.classList.toggle('hidden');
}

// Get user inputs
function getUserInputs() {
    const selectedModule = moduleDropdown.value;
    if (selectedModule === "Pick a Module") {
        resultsText.innerHTML = "Please select a module first.";
        return [null, null, null];
    }
    
    let quantity;
    try {
        quantity = parseInt(quantityInput.value) || 1;
        if (quantity <= 0) throw new Error("Quantity must be positive");
    } catch (e) {
        resultsText.innerHTML = "Please enter a valid positive number for quantity.";
        return [null, null, null];
    }
    
    let sunlightPercentage;
    try {
        sunlightPercentage = parseFloat(sunlightInput.value) || 100;
        if (sunlightPercentage <= 0 || sunlightPercentage > 400) {
            throw new Error("Sunlight percentage must be greater than 0 and up to 400%");
        }
    } catch (e) {
        resultsText.innerHTML = "Sunlight percentage must be greater than 0 and up to 400%";
        return [null, null, null];
    }
    
    const sunlightMultiplier = sunlightPercentage / 100;
    return [selectedModule, quantity, sunlightMultiplier];
}

// Calculate chain production
function calculateChainProduction(selectedModule, quantity, sunlightMultiplier) {
    const currentFilter = filterDropdown.value;
    const productionRates = {};
    const usedVariants = {};
    const rawResourceRequirements = {};
    
    const moduleInfo = getModuleVariant(selectedModule, currentFilter);
    usedVariants[selectedModule] = moduleInfo.module_tag || "normal";
    
    let targetAmount;
    if (selectedModule === "Energy Cells") {
        targetAmount = quantity * moduleInfo.produced * sunlightMultiplier;
    } else {
        targetAmount = quantity * moduleInfo.produced;
    }
    
    const moduleQueue = [[selectedModule, quantity]];
    const processedModules = new Set();
    
    while (moduleQueue.length > 0) {
        const [moduleName, moduleCount] = moduleQueue.shift();
        
        if (processedModules.has(moduleName)) continue;
        processedModules.add(moduleName);
        
        const currentModuleInfo = getModuleVariant(moduleName, currentFilter);
        usedVariants[moduleName] = currentModuleInfo.module_tag || "normal";
        
        let production;
        if (moduleName === "Energy Cells") {
            production = currentModuleInfo.produced * moduleCount * sunlightMultiplier;
        } else {
            production = currentModuleInfo.produced * moduleCount;
        }
        
        productionRates[moduleName] = (productionRates[moduleName] || 0) + production;
        
        // Calculate raw resources (using rounded-up count)
        const roundedModuleCount = Math.ceil(moduleCount);
        for (const resourceDict of currentModuleInfo.raw_resources) {
            for (const [resourceName, resourceAmount] of Object.entries(resourceDict)) {
                const resourceAmountNeeded = resourceAmount * roundedModuleCount;
                rawResourceRequirements[resourceName] = (rawResourceRequirements[resourceName] || 0) + resourceAmountNeeded;
            }
        }
        
        // Process dependencies
        for (const [neededModule, neededAmount] of Object.entries(currentModuleInfo.needed)) {
            const neededModuleInfo = getModuleVariant(neededModule, currentFilter);
            
            let neededModuleCount;
            if (neededModule === "Energy Cells") {
                neededModuleCount = (neededAmount * moduleCount) / (neededModuleInfo.produced * sunlightMultiplier);
            } else {
                neededModuleCount = (neededAmount * moduleCount) / neededModuleInfo.produced;
            }
            
            moduleQueue.push([neededModule, neededModuleCount]);
        }
    }
    
    return {
        productionRates,
        rawResourceRequirements,
        usedVariants
    };
}

// Calculate chain demand
function calculateChainDemand(requiredModules, sunlightMultiplier) {
    const consumptionRates = {};
    const currentFilter = filterDropdown.value;
    
    for (const [moduleName, moduleCount] of Object.entries(requiredModules)) {
        if (!modules[moduleName]) continue;
        
        const moduleInfo = getModuleVariant(moduleName, currentFilter);
        
        for (const [neededModule, neededAmount] of Object.entries(moduleInfo.needed)) {
            const neededAmountPerHour = neededAmount * moduleCount;
            consumptionRates[neededModule] = (consumptionRates[neededModule] || 0) + neededAmountPerHour;
        }
    }
    
    return consumptionRates;
}

// Calculate required modules
function calculateRequiredModules(productionRates, consumptionRates, sunlightMultiplier) {
    const requiredModules = {};
    const currentFilter = filterDropdown.value;
    
    // First pass - calculate based on production needs
    for (const [moduleName, productionRate] of Object.entries(productionRates)) {
        if (modules[moduleName]) {
            const moduleInfo = getModuleVariant(moduleName, currentFilter);
            
            let moduleOutputRate;
            if (moduleName === "Energy Cells") {
                moduleOutputRate = moduleInfo.produced * sunlightMultiplier;
            } else {
                moduleOutputRate = moduleInfo.produced;
            }
                
            const modulesRequired = productionRate / moduleOutputRate;
            requiredModules[moduleName] = Math.ceil(modulesRequired);
        }
    }
    
    // Second pass - ensure we meet all consumption demands
    for (const [moduleName, consumptionRate] of Object.entries(consumptionRates)) {
        if (modules[moduleName]) {
            const moduleInfo = getModuleVariant(moduleName, currentFilter);
            
            let moduleOutputRate;
            if (moduleName === "Energy Cells") {
                moduleOutputRate = moduleInfo.produced * sunlightMultiplier;
            } else {
                moduleOutputRate = moduleInfo.produced;
            }
                
            const currentProduction = (requiredModules[moduleName] || 0) * moduleOutputRate;
            
            if (currentProduction < consumptionRate) {
                const additionalModulesNeeded = Math.ceil((consumptionRate - currentProduction) / moduleOutputRate);
                requiredModules[moduleName] = (requiredModules[moduleName] || 0) + additionalModulesNeeded;
            }
        }
    }
    
    return requiredModules;
}

// Calculate storage per ware requirements
function calculateStoragePerWareRequirements(requiredModules, rawResourceRequirements, sunlightMultiplier) {
    const storagePerWare = {
        "Solid": {},
        "Liquid": {},
        "Container": {}
    };
    
    const currentFilter = filterDropdown.value;
    
    // Calculate for module outputs
    for (const [moduleName, moduleCount] of Object.entries(requiredModules)) {
        if (!modules[moduleName] || moduleName === "Scrap Recycler") continue;
        
        const moduleInfo = getModuleVariant(moduleName, currentFilter);
        
        let production;
        if (moduleName === "Energy Cells") {
            production = moduleInfo.produced * moduleCount * sunlightMultiplier;
        } else {
            production = moduleInfo.produced * moduleCount;
        }
            
        storagePerWare[moduleInfo.storage_type][moduleName] = production * moduleInfo.storage_use_per_ware;
    }
    
    // Special handling for Scrap Recycler if present
    if (requiredModules["Scrap Recycler"]) {
        const scrapRecyclerCount = requiredModules["Scrap Recycler"];
        const scrapRecyclerInfo = modules["Scrap Recycler"];
        
        // Module Prefab output
        const modulePrefabProduction = scrapRecyclerInfo.produced["Module Prefab"] * scrapRecyclerCount;
        storagePerWare["Container"]["Module Prefab"] = 
            modulePrefabProduction * scrapRecyclerInfo.storage_info["Module Prefab"].storage_use_per_ware;
        
        // Durasteel Plates output
        const durasteelProduction = scrapRecyclerInfo.produced["Durasteel Plates"] * scrapRecyclerCount;
        storagePerWare["Container"]["Durasteel Plates"] = 
            durasteelProduction * scrapRecyclerInfo.storage_info["Durasteel Plates"].storage_use_per_ware;
    }
    
    // Calculate for raw resources
    for (const [resource, amount] of Object.entries(rawResourceRequirements)) {
        if (raw_resources[resource]) {
            storagePerWare[raw_resources[resource].storage_type][resource] = 
                amount * raw_resources[resource].storage_use;
        }
    }
    
    return storagePerWare;
}

// Calculate storage total requirement
function calculateStorageTotalRequirement(storagePerWare) {
    const storageTotals = {
        "Solid": {"total": 0, "units": {}},
        "Liquid": {"total": 0, "units": {}},
        "Container": {"total": 0, "units": {}}
    };
    
    for (const [storageType, items] of Object.entries(storagePerWare)) {
        const totalStorage = Object.values(items).reduce((sum, amount) => sum + amount, 0);
        storageTotals[storageType].total = formatNumber(totalStorage);
        
        const largeCapacity = storage_types[storageType]["Large Storage"].capacity;
        const mediumCapacity = storage_types[storageType]["Medium Storage"].capacity;
        const smallCapacity = storage_types[storageType]["Small Storage"].capacity;
        
        let largeUnits = Math.floor(totalStorage / largeCapacity);
        let remainder = totalStorage % largeCapacity;
        
        let mediumUnits = Math.floor(remainder / mediumCapacity);
        remainder = remainder % mediumCapacity;
        
        let smallUnits = Math.floor(remainder / smallCapacity);
        if (remainder % smallCapacity > 0) {
            smallUnits++;
        }
        
        storageTotals[storageType].units = {
            "Large Storage": formatNumber(largeUnits),
            "Medium Storage": formatNumber(mediumUnits),
            "Small Storage": formatNumber(smallUnits)
        };
    }
    
    return storageTotals;
}

// Check and adjust surplus
function checkAndAdjustSurplus(selectedModule, quantity, sunlightMultiplier, requiredModules) {
    const adjustedModules = {...requiredModules};
    let needsRecalculation = false;
    const currentFilter = filterDropdown.value;
    
    // First pass - identify all negative surpluses (excluding Scrap Recycler)
    for (const moduleName of Object.keys(adjustedModules).sort()) {
        if (modules[moduleName] && moduleName !== "Scrap Recycler") {
            const moduleInfo = getModuleVariant(moduleName, currentFilter);
            
            let production;
            if (moduleName === "Energy Cells") {
                production = moduleInfo.produced * adjustedModules[moduleName] * sunlightMultiplier;
            } else {
                production = moduleInfo.produced * adjustedModules[moduleName];
            }
                
            let consumption = 0;
            for (const [consumer, consumerCount] of Object.entries(adjustedModules)) {
                const consumerInfo = getModuleVariant(consumer, currentFilter);
                if (consumerInfo.needed && consumerInfo.needed[moduleName]) {
                    consumption += consumerInfo.needed[moduleName] * consumerCount;
                }
            }
            
            const surplus = production - consumption;
            
            if (surplus < 0) {
                const deficit = -surplus;
                let moduleOutput;
                if (moduleName === "Energy Cells") {
                    moduleOutput = moduleInfo.produced * sunlightMultiplier;
                } else {
                    moduleOutput = moduleInfo.produced;
                }
                    
                const additionalModules = Math.ceil(deficit / moduleOutput);
                adjustedModules[moduleName] += additionalModules;
                needsRecalculation = true;
            }
        }
    }
    
    // Special handling for Scrap Recycler outputs if present
    if (adjustedModules["Scrap Recycler"]) {
        const scrapRecyclerCount = adjustedModules["Scrap Recycler"];
        const scrapRecyclerInfo = modules["Scrap Recycler"];
        
        // Module Prefab balance
        const modulePrefabProduction = scrapRecyclerInfo.produced["Module Prefab"] * scrapRecyclerCount;
        let modulePrefabConsumption = 0;
        for (const [consumer, consumerCount] of Object.entries(adjustedModules)) {
            const consumerInfo = getModuleVariant(consumer, currentFilter);
            if (consumerInfo.needed && consumerInfo.needed["Module Prefab"]) {
                modulePrefabConsumption += consumerInfo.needed["Module Prefab"] * consumerCount;
            }
        }
        const modulePrefabSurplus = modulePrefabProduction - modulePrefabConsumption;
        
        // Durasteel Plates balance
        const durasteelProduction = scrapRecyclerInfo.produced["Durasteel Plates"] * scrapRecyclerCount;
        let durasteelConsumption = 0;
        for (const [consumer, consumerCount] of Object.entries(adjustedModules)) {
            const consumerInfo = getModuleVariant(consumer, currentFilter);
            if (consumerInfo.needed && consumerInfo.needed["Durasteel Plates"]) {
                durasteelConsumption += consumerInfo.needed["Durasteel Plates"] * consumerCount;
            }
        }
        const durasteelSurplus = durasteelProduction - durasteelConsumption;
        
        // If either output has a deficit, we need more Scrap Recyclers
        if (modulePrefabSurplus < 0 || durasteelSurplus < 0) {
            let additionalRecyclers = 0;
            
            // Calculate needed for Module Prefab
            if (modulePrefabSurplus < 0) {
                const deficit = -modulePrefabSurplus;
                const productionPerRecycler = scrapRecyclerInfo.produced["Module Prefab"];
                const neededForPrefab = Math.ceil(deficit / productionPerRecycler);
                additionalRecyclers = Math.max(additionalRecyclers, neededForPrefab);
            }
            
            // Calculate needed for Durasteel Plates
            if (durasteelSurplus < 0) {
                const deficit = -durasteelSurplus;
                const productionPerRecycler = scrapRecyclerInfo.produced["Durasteel Plates"];
                const neededForDurasteel = Math.ceil(deficit / productionPerRecycler);
                additionalRecyclers = Math.max(additionalRecyclers, neededForDurasteel);
            }
            
            if (additionalRecyclers > 0) {
                adjustedModules["Scrap Recycler"] += additionalRecyclers;
                needsRecalculation = true;
            }
        }
    }
    
    // If we made adjustments, we need to recalculate everything
    if (needsRecalculation) {
        // Recalculate raw resources with the new module counts
        const newRawResources = {};
        for (const [moduleName, moduleCount] of Object.entries(adjustedModules)) {
            const moduleInfo = getModuleVariant(moduleName, currentFilter);
            for (const resourceDict of moduleInfo.raw_resources) {
                for (const [resourceName, resourceAmount] of Object.entries(resourceDict)) {
                    const resourceAmountNeeded = resourceAmount * moduleCount;
                    newRawResources[resourceName] = (newRawResources[resourceName] || 0) + resourceAmountNeeded;
                }
            }
        }
        
        // Recalculate storage requirements
        const newStoragePerWare = calculateStoragePerWareRequirements(
            adjustedModules,
            newRawResources,
            sunlightMultiplier
        );
        const newStorageTotals = calculateStorageTotalRequirement(newStoragePerWare);
        
        // Update the display with the new values
        displayResults(
            selectedModule,
            quantity,
            sunlightMultiplier,
            adjustedModules,
            newRawResources,
            newStoragePerWare,
            newStorageTotals
        );
        
        return adjustedModules;
    }
    
    return requiredModules;
}

// Scrap Recycler special calculation
function calculateScrapRecycler(quantity, sunlightMultiplier) {
    const scrapRecyclerInfo = modules["Scrap Recycler"];
    const currentFilter = filterDropdown.value;
    
    // Initialize dictionaries
    const productionRates = {
        "Module Prefab": scrapRecyclerInfo.produced["Module Prefab"] * quantity,
        "Durasteel Plates": scrapRecyclerInfo.produced["Durasteel Plates"] * quantity
    };
    
    // Start with just the Scrap Recyclers
    const requiredModules = {"Scrap Recycler": quantity};
    
    // Calculate raw resources (will be updated later)
    const rawResourceRequirements = {};
    
    // FIRST PASS: Calculate direct inputs (Energy Cells and Scrap Metal)
    // Energy Cells directly consumed by Scrap Recycler
    const scrapRecyclerEnergyNeeds = scrapRecyclerInfo.needed["Energy Cells"] * quantity;
    
    // Scrap Metal needed by Scrap Recycler
    const scrapMetalNeeded = scrapRecyclerInfo.needed["Scrap Metal"] * quantity;
    
    // Energy Cells needed to produce Scrap Metal
    const scrapMetalInfo = modules["Scrap Metal"];
    const scrapMetalEnergyNeeds = (scrapMetalNeeded / scrapMetalInfo.produced) * scrapMetalInfo.needed["Energy Cells"];
    
    // Total Energy Cells needed
    const totalEnergyNeeds = scrapRecyclerEnergyNeeds + scrapMetalEnergyNeeds;
    
    // Get the Energy Cells variant based on current filter
    const energyCellsInfo = getModuleVariant("Energy Cells", currentFilter);
    
    // Calculate required Energy Cells modules (accounting for sunlight)
    const energyCellsNeeded = Math.ceil(totalEnergyNeeds / (energyCellsInfo.produced * sunlightMultiplier));
    requiredModules["Energy Cells"] = energyCellsNeeded;
    
    // Calculate required Scrap Metal modules
    const scrapMetalNeededModules = Math.ceil(scrapMetalNeeded / scrapMetalInfo.produced);
    requiredModules["Scrap Metal"] = scrapMetalNeededModules;
    
    // SECOND PASS: Now calculate the full production chain for all needed modules
    // This will properly account for any other dependencies in the chain
    
    // Create a queue of modules to process (starting with our direct inputs)
    const moduleQueue = Object.entries(requiredModules);
    const processedModules = new Set();
    
    while (moduleQueue.length > 0) {
        const [moduleName, moduleCount] = moduleQueue.shift();
        
        if (processedModules.has(moduleName)) continue;
        processedModules.add(moduleName);
        
        // Get module info
        const currentModuleInfo = getModuleVariant(moduleName, currentFilter);
        
        // Calculate raw resources for this module (using rounded-up count)
        for (const resourceDict of currentModuleInfo.raw_resources) {
            for (const [resourceName, resourceAmount] of Object.entries(resourceDict)) {
                const resourceAmountNeeded = resourceAmount * moduleCount;
                rawResourceRequirements[resourceName] = (rawResourceRequirements[resourceName] || 0) + resourceAmountNeeded;
            }
        }
        
        // Process dependencies (needed modules)
        for (const [neededModule, neededAmount] of Object.entries(currentModuleInfo.needed)) {
            const neededModuleInfo = getModuleVariant(neededModule, currentFilter);
            
            let neededModuleCount;
            if (neededModule === "Energy Cells") {
                neededModuleCount = (neededAmount * moduleCount) / (neededModuleInfo.produced * sunlightMultiplier);
            } else {
                neededModuleCount = (neededAmount * moduleCount) / neededModuleInfo.produced;
            }
            
            // Add to queue if we haven't processed it yet
            if (!processedModules.has(neededModule)) {
                moduleQueue.push([neededModule, neededModuleCount]);
            }
            
            // Update required modules count (using max of existing and new calculation)
            const existingCount = requiredModules[neededModule] || 0;
            requiredModules[neededModule] = Math.max(existingCount, Math.ceil(neededModuleCount));
        }
    }
    
    // Calculate storage requirements - SPECIAL HANDLING FOR DUAL OUTPUTS
    const storagePerWare = {"Solid": {}, "Liquid": {}, "Container": {}};
    
    // Storage for outputs
    storagePerWare["Container"]["Module Prefab"] = 
        productionRates["Module Prefab"] * scrapRecyclerInfo.storage_info["Module Prefab"].storage_use_per_ware;
    storagePerWare["Container"]["Durasteel Plates"] = 
        productionRates["Durasteel Plates"] * scrapRecyclerInfo.storage_info["Durasteel Plates"].storage_use_per_ware;
    
    // Storage for all modules in the chain
    for (const [moduleName, moduleCount] of Object.entries(requiredModules)) {
        if (modules[moduleName] && moduleName !== "Scrap Recycler") {
            const modInfo = getModuleVariant(moduleName, currentFilter);
            let production;
            if (moduleName === "Energy Cells") {
                production = modInfo.produced * moduleCount * sunlightMultiplier;
            } else {
                production = modInfo.produced * moduleCount;
            }
            
            storagePerWare[modInfo.storage_type][moduleName] = production * modInfo.storage_use_per_ware;
        }
    }
    
    // Storage for raw resources
    for (const [resource, amount] of Object.entries(rawResourceRequirements)) {
        if (raw_resources[resource]) {
            storagePerWare[raw_resources[resource].storage_type][resource] = 
                amount * raw_resources[resource].storage_use;
        }
    }
    
    // Calculate total storage requirements
    const storageTotals = calculateStorageTotalRequirement(storagePerWare);
    
    return {
        requiredModules,
        rawResourceRequirements,
        productionRates,
        storagePerWare,
        storageTotals
    };
}

// Display results
function displayResults(
    selectedModule,
    quantity,
    sunlightMultiplier,
    requiredModules,
    rawResourceRequirements,
    storagePerWare,
    storageTotals
) {
    // Clear all text areas
    resultsText.innerHTML = '';
    results2Text.innerHTML = '';
    totalText.innerHTML = '';
    advancedText.innerHTML = '';
    advancedText2.innerHTML = '';
    advancedText3.innerHTML = '';
    advancedText4.innerHTML = '';
    
    const currentFilter = filterDropdown.value;
    
    // =====================================================================
    // Modules Needed in the Chain (Left Panel - resultsText)
    // =====================================================================
    appendText(resultsText, "Module Chain for:\n", 'label');
    appendText(resultsText, `${formatNumber(quantity)}x ${selectedModule}:\n`, 'module');
    appendText(resultsText, "-".repeat(30) + "\n", 'label');
    
    // Target module first
    appendText(resultsText, "Target Module:\n", 'label');
    appendText(resultsText, `${selectedModule}: `, 'module');
    appendText(resultsText, `${formatNumber(requiredModules[selectedModule])} modules\n`, 'number');
    appendText(resultsText, "-".repeat(30) + "\n", 'label');
    
    // Other modules sorted alphabetically
    for (const moduleName of Object.keys(requiredModules).sort()) {
        if (moduleName !== selectedModule) {
            appendText(resultsText, `${moduleName}: `, 'module');
            appendText(resultsText, `${formatNumber(requiredModules[moduleName])} modules\n`, 'number');
        }
    }

    // =====================================================================
    // Raw Resources (Right Panel - results2Text)
    // =====================================================================
    appendText(results2Text, "Raw Resources Required:\n", 'label');
    appendText(results2Text, "-".repeat(30) + "\n", 'label');
    for (const resource of Object.keys(rawResourceRequirements).sort()) {
        appendText(results2Text, `${resource}: `, 'module');
        appendText(results2Text, `${formatNumber(rawResourceRequirements[resource])} units/hr\n`, 'number');
    }

    // =====================================================================
    // Total Production (Bottom Right - totalText)
    // =====================================================================
    appendText(totalText, "Total Wares Produced Hourly:\n", 'label');
    appendText(totalText, "-".repeat(30) + "\n", 'label');
    
    const moduleInfo = getModuleVariant(selectedModule, currentFilter);
    
    if (selectedModule === "Scrap Recycler") {
        // Special display for dual outputs
        const scrapRecyclerInfo = modules[selectedModule];
        appendText(totalText, "Module Prefab", 'module');
        appendText(totalText, ": ", 'label');
        appendText(totalText, `${formatNumber(scrapRecyclerInfo.produced["Module Prefab"] * quantity)}`, 'number');
        appendText(totalText, " units/hr\n", 'label');
        
        appendText(totalText, "Durasteel Plates", 'module');
        appendText(totalText, ": ", 'label');
        appendText(totalText, `${formatNumber(scrapRecyclerInfo.produced["Durasteel Plates"] * quantity)}`, 'number');
        appendText(totalText, " units/hr\n", 'label');
        
    } else if (selectedModule === "Energy Cells") {
        const targetAmount = quantity * moduleInfo.produced * sunlightMultiplier;
        appendText(totalText, `${selectedModule} `, 'module');
        appendText(totalText, `${formatNumber(targetAmount)}`, 'number');
        appendText(totalText, " units/hr\n", 'label');
        
    } else {
        const targetAmount = quantity * moduleInfo.produced;
        appendText(totalText, `${selectedModule}`, 'module');
        appendText(totalText, ": ", 'label');
        appendText(totalText, `${formatNumber(targetAmount)}`, 'number');
        appendText(totalText, " units/hr\n", 'label');
    }

    // =====================================================================
    // Advanced Text 1: Demand Breakdown (Detailed Production Chain + Reverse Demand)
    // =====================================================================
    appendText(advancedText, "Detailed Production Chain:\n", 'label');
    appendText(advancedText, "-".repeat(40) + "\n", 'label');
    
    const modulesToDisplay = [selectedModule, ...Object.keys(requiredModules)
        .filter(m => m !== selectedModule).sort()];
    
    for (const moduleName of modulesToDisplay) {
        const moduleCount = requiredModules[moduleName];
        const moduleInfo = getModuleVariant(moduleName, currentFilter);
        
        // Handle Scrap Recycler differently
        if (moduleName === "Scrap Recycler") {
            appendText(advancedText, `${moduleName} (${moduleCount} modules):\n`, 'module');
            
            // Show both outputs
            appendText(advancedText, `  Produces:\n`, 'produce.label');
            appendText(advancedText, `    Module Prefab: `, 'module');
            appendText(advancedText, `${formatNumber(moduleInfo.produced["Module Prefab"] * moduleCount)}/hr\n`, 'number');
            appendText(advancedText, `    Durasteel Plates: `, 'module');
            appendText(advancedText, `${formatNumber(moduleInfo.produced["Durasteel Plates"] * moduleCount)}/hr\n`, 'number');
            
            // Show consumption
            if (Object.keys(moduleInfo.needed).length > 0) {
                appendText(advancedText, `  Consumes:\n`, 'consume.label');
                for (const [needed, amount] of Object.entries(moduleInfo.needed)) {
                    const totalConsumed = amount * moduleCount;
                    appendText(advancedText, `    ${needed}: `, 'module');
                    appendText(advancedText, `${formatNumber(totalConsumed)}/hr\n`, 'consume');
                }
            }
        } else {
            // Only apply sunlight multiplier to Energy Cells production
            let production;
            if (moduleName === "Energy Cells") {
                production = moduleInfo.produced * moduleCount * sunlightMultiplier;
            } else {
                production = moduleInfo.produced * moduleCount;
            }
            
            appendText(advancedText, `${moduleName} (${moduleCount} modules):\n`, 'module');
            appendText(advancedText, `  Produces: `, 'produce.label');
            appendText(advancedText, `${formatNumber(production)}/hr\n`, 'number');
            
            if (Object.keys(moduleInfo.needed).length > 0) {
                appendText(advancedText, `  Consumes:\n`, 'consume.label');
                for (const [needed, amount] of Object.entries(moduleInfo.needed)) {
                    const totalConsumed = amount * moduleCount;
                    appendText(advancedText, `    ${needed}: `, 'module');
                    appendText(advancedText, `${formatNumber(totalConsumed)}/hr\n`, 'consume');
                }
            }
        }
        
        if (moduleInfo.raw_resources.length > 0) {
            appendText(advancedText, `  Raw Resources:\n`, 'consume.label');
            for (const resourceDict of moduleInfo.raw_resources) {
                for (const [resource, amount] of Object.entries(resourceDict)) {
                    const totalConsumed = amount * moduleCount;
                    appendText(advancedText, `    ${resource}: `, 'module');
                    appendText(advancedText, `${formatNumber(totalConsumed)}/hr\n`, 'consume');
                }
            }
        }
        
        appendText(advancedText, "\n", 'label');
    }

    // Reverse Demand Breakdown
    appendText(advancedText, "\nReverse Demand Breakdown:\n", 'label');
    appendText(advancedText, "-".repeat(40) + "\n", 'label');
    
    const demandDict = {};
    const rawResourcesList = [];
    
    // Process modules first
    for (const [moduleName, moduleCount] of Object.entries(requiredModules)) {
        const moduleInfo = getModuleVariant(moduleName, currentFilter);
        if (!moduleInfo || moduleName === "Scrap Recycler") continue;
            
        for (const [needed, amount] of Object.entries(moduleInfo.needed)) {
            const totalNeeded = amount * moduleCount;
            if (!demandDict[needed]) {
                demandDict[needed] = {total: 0, sources: []};
            }
            demandDict[needed].total += totalNeeded;
            demandDict[needed].sources.push([moduleName, totalNeeded]);
        }
    }
    
    // Process raw resources separately
    for (const resource of Object.keys(rawResourceRequirements)) {
        rawResourcesList.push(resource);
        demandDict[resource] = {
            total: rawResourceRequirements[resource],
            sources: []
        };
    }
    
    // Display modules first
    for (const item of Object.keys(demandDict).sort()) {
        if (!rawResourcesList.includes(item)) {
            const data = demandDict[item];
            appendText(advancedText, `${item} (Total Demand: ${formatNumber(data.total)}/hr):\n`, 'module');
            
            for (const [consumer, amount] of data.sources.sort((a, b) => b[1] - a[1])) {
                appendText(advancedText, `  Used by ${consumer}: `, 'consume');
                appendText(advancedText, `${formatNumber(amount)}/hr\n`, 'number');
            }
            
            appendText(advancedText, "\n", 'label');
        }
    }
    
    // Display raw resources at bottom
    if (rawResourcesList.length > 0) {
        appendText(advancedText, "Raw Resources:\n", 'label');
        for (const resource of rawResourcesList.sort()) {
            const data = demandDict[resource];
            appendText(advancedText, `${resource} (Total Demand: ${formatNumber(data.total)}/hr):\n`, 'module');
            appendText(advancedText, `  Consumed by production chain\n`, 'deficit');
            appendText(advancedText, "\n", 'label');
        }
    }

    // =====================================================================
    // Advanced Text 2: Storage Requirements
    // =====================================================================
    appendText(advancedText2, "Precise Storage Requirements:\n", 'storage_label');
    appendText(advancedText2, "-".repeat(40) + "\n", 'storage_label');
    
    for (const storageType of ["Solid", "Liquid", "Container"]) {
        if (storageTotals[storageType].total > 0) {
            appendText(advancedText2, `${storageType} Storage:\n`, 'storage_label');
            appendText(advancedText2, `  Total Needed: `, 'storage_size');
            appendText(advancedText2, `${formatNumber(storageTotals[storageType].total)} units\n`, 'number');
            
            for (const size of ["Large Storage", "Medium Storage", "Small Storage"]) {
                const count = storageTotals[storageType].units[size] || 0;
                if (count > 0) {
                    appendText(advancedText2, `  ${size}: `, 'storage_size');
                    appendText(advancedText2, `${count}\n`, 'number');
                }
            }
            
            appendText(advancedText2, "\n", 'label');
        }
    }

    // =====================================================================
    // Advanced Text 3: Storage Per Ware
    // =====================================================================
    appendText(advancedText3, "Storage Breakdown by Item:\n", 'label');
    appendText(advancedText3, "-".repeat(40) + "\n", 'label');

    for (const storageType of ["Solid", "Liquid", "Container"]) {
        if (Object.keys(storagePerWare[storageType]).length > 0) {
            appendText(advancedText3, `${storageType} Items:\n`, 'storage_label');
            
            for (const [item, amount] of Object.entries(storagePerWare[storageType]).sort()) {
                let storagePerUnit = 0;
                
                if (raw_resources[item]) {
                    storagePerUnit = raw_resources[item].storage_use;
                } else if (modules[item]) {
                    // Skip Scrap Recycler as we handle its outputs separately
                    if (item === "Scrap Recycler") {
                        continue;
                    }
                    
                    // Get the module info using current filter
                    const moduleInfo = getModuleVariant(item, currentFilter);
                    
                    // Handle Module Prefab and Durasteel Plates differently based on source
                    if (["Module Prefab", "Durasteel Plates"].includes(item)) {
                        // Check if this is coming from Scrap Recycler or direct production
                        if (requiredModules["Scrap Recycler"] && 
                            item in modules["Scrap Recycler"].produced) {
                            // From Scrap Recycler
                            const production = modules["Scrap Recycler"].produced[item] * 
                                requiredModules["Scrap Recycler"];
                            storagePerUnit = modules["Scrap Recycler"].storage_info[item].storage_use_per_ware;
                        } else {
                            // Direct production
                            const production = moduleInfo.produced * (requiredModules[item] || 0);
                            storagePerUnit = moduleInfo.storage_use_per_ware;
                        }
                    } else {
                        // Normal module
                        storagePerUnit = moduleInfo.storage_use_per_ware;
                    }
                }
                
                appendText(advancedText3, `  ${item}:\n`, 'module');
                
                if (raw_resources[item]) {
                    appendText(advancedText3, `    Consumption: `, 'consume.label');
                    appendText(advancedText3, `${formatNumber(rawResourceRequirements[item])}/hr\n`, 'consume');
                } else {
                    // Calculate production based on source
                    let production;
                    if (["Module Prefab", "Durasteel Plates"].includes(item)) {
                        if (requiredModules["Scrap Recycler"] && 
                            item in modules["Scrap Recycler"].produced) {
                            production = modules["Scrap Recycler"].produced[item] * 
                                requiredModules["Scrap Recycler"];
                        } else {
                            production = moduleInfo.produced * (requiredModules[item] || 0);
                        }
                    } else {
                        if (item === "Energy Cells") {
                            production = moduleInfo.produced * requiredModules[item] * sunlightMultiplier;
                        } else {
                            production = moduleInfo.produced * requiredModules[item];
                        }
                    }
                    
                    appendText(advancedText3, `    Production: `, 'produce.label');
                    appendText(advancedText3, `${formatNumber(production)}/hr\n`, 'number');
                }
                
                appendText(advancedText3, `    Storage/Unit: `, 'storage_size');
                appendText(advancedText3, `${storagePerUnit}\n`, 'number');
                
                appendText(advancedText3, `    Total Storage: `, 'storage_size');
                appendText(advancedText3, `${formatNumber(amount)}\n`, 'number');
                
                appendText(advancedText3, "\n", 'label');
            }
        }
    }

    // =====================================================================
    // Advanced Text 4: Surplus/Deficit Breakdown
    // =====================================================================
    appendText(advancedText4, "Production Surplus:\n", 'label');
    appendText(advancedText4, "-".repeat(40) + "\n", 'label');
    
    // Handle all modules including special cases
    for (const moduleName of Object.keys(requiredModules).sort()) {
        const moduleInfo = getModuleVariant(moduleName, currentFilter);
        
        // Skip if not a module or if it's Scrap Recycler (handled separately)
        if (!moduleInfo || moduleName === "Scrap Recycler") continue;
            
        // Calculate production
        let production;
        if (moduleName === "Energy Cells") {
            production = moduleInfo.produced * requiredModules[moduleName] * sunlightMultiplier;
        } else {
            production = moduleInfo.produced * requiredModules[moduleName];
        }
            
        // Calculate consumption
        let consumption = 0;
        for (const [consumer, consumerCount] of Object.entries(requiredModules)) {
            const consumerInfo = getModuleVariant(consumer, currentFilter);
            if (consumerInfo.needed && consumerInfo.needed[moduleName]) {
                consumption += consumerInfo.needed[moduleName] * consumerCount;
            }
        }
        
        // Always show modules that are either:
        // 1. Direct inputs to Scrap Recycler (Energy Cells, Scrap Metal)
        // 2. Part of the production chain for Scrap Recycler
        // 3. The selected module itself
        const isScrapRecyclerInput = moduleName in (modules["Scrap Recycler"]?.needed || {});
        const isPartOfChain = moduleName in requiredModules;
        
        if (isScrapRecyclerInput || isPartOfChain || moduleName === selectedModule) {
            const surplus = production - consumption;
            appendText(advancedText4, `${moduleName}:\n`, 'module');
            appendText(advancedText4, `  Produced: `, 'produce.label');
            appendText(advancedText4, `${formatNumber(production)}/hr\n`, 'number');
            
            if (moduleName !== selectedModule) {
                appendText(advancedText4, `  Consumed: `, 'consume.label');
                appendText(advancedText4, `${formatNumber(consumption)}/hr\n`, 'consume');
                
                if (surplus > 0) {
                    appendText(advancedText4, `  Surplus: `, 'surplus.bold');
                    appendText(advancedText4, `${formatNumber(surplus)}/hr\n`, 'surplus');
                } else if (surplus < 0) {
                    appendText(advancedText4, `  Deficit: `, 'deficit.bold');
                    appendText(advancedText4, `${formatNumber(-surplus)}/hr\n`, 'deficit');
                } else {
                    appendText(advancedText4, `  Balanced: `, 'label');
                    appendText(advancedText4, `0/hr\n`, 'number');
                }
            } else {
                appendText(advancedText4, `  Net Production: `, 'surplus.bold');
                appendText(advancedText4, `${formatNumber(production)}/hr\n`, 'surplus');
            }
            
            appendText(advancedText4, "\n", 'label');
        }
    }

    // Special handling for Scrap Recycler outputs if present
    if (requiredModules["Scrap Recycler"]) {
        const moduleCount = requiredModules["Scrap Recycler"];
        const moduleInfo = modules["Scrap Recycler"];
        
        // Module Prefab output
        if ("Module Prefab" in moduleInfo.produced) {
            const production = moduleInfo.produced["Module Prefab"] * moduleCount;
            let consumption = 0;
            for (const [consumer, consumerCount] of Object.entries(requiredModules)) {
                const consumerInfo = getModuleVariant(consumer, currentFilter);
                if (consumerInfo.needed && consumerInfo.needed["Module Prefab"]) {
                    consumption += consumerInfo.needed["Module Prefab"] * consumerCount;
                }
            }
            const surplus = production - consumption;
            
            appendText(advancedText4, "Module Prefab (from Scrap Recycler):\n", 'module');
            appendText(advancedText4, `  Produced: `, 'produce.label');
            appendText(advancedText4, `${formatNumber(production)}/hr\n`, 'number');
            appendText(advancedText4, `  Consumed: `, 'consume.label');
            appendText(advancedText4, `${formatNumber(consumption)}/hr\n`, 'consume');
            appendText(advancedText4, `  Surplus: `, 'surplus.bold');
            appendText(advancedText4, `${formatNumber(surplus)}/hr\n`, 'surplus');
            appendText(advancedText4, "\n", 'label');
        }
        
        // Durasteel Plates output
        if ("Durasteel Plates" in moduleInfo.produced) {
            const production = moduleInfo.produced["Durasteel Plates"] * moduleCount;
            let consumption = 0;
            for (const [consumer, consumerCount] of Object.entries(requiredModules)) {
                const consumerInfo = getModuleVariant(consumer, currentFilter);
                if (consumerInfo.needed && consumerInfo.needed["Durasteel Plates"]) {
                    consumption += consumerInfo.needed["Durasteel Plates"] * consumerCount;
                }
            }
            const surplus = production - consumption;
            
            appendText(advancedText4, "Durasteel Plates (from Scrap Recycler):\n", 'module');
            appendText(advancedText4, `  Produced: `, 'produce.label');
            appendText(advancedText4, `${formatNumber(production)}/hr\n`, 'number');
            appendText(advancedText4, `  Consumed: `, 'consume.label');
            appendText(advancedText4, `${formatNumber(consumption)}/hr\n`, 'consume');
            appendText(advancedText4, `  Surplus: `, 'surplus.bold');
            appendText(advancedText4, `${formatNumber(surplus)}/hr\n`, 'surplus');
            appendText(advancedText4, "\n", 'label');
        }
    }

    // Raw Resource Consumption section
    appendText(advancedText4, "Raw Resource Consumption:\n", 'label');
    appendText(advancedText4, "-".repeat(40) + "\n", 'label');
    
    for (const resource of Object.keys(rawResourceRequirements).sort()) {
        const amount = rawResourceRequirements[resource];
        appendText(advancedText4, `${resource}:\n`, 'module');
        appendText(advancedText4, `  Consumed: `, 'consume.label');
        appendText(advancedText4, `${formatNumber(amount)}/hr\n`, 'consume');
        appendText(advancedText4, `  Deficit: `, 'deficit.bold');
        appendText(advancedText4, `${formatNumber(amount)}/hr\n`, 'deficit');
        appendText(advancedText4, "\n", 'label');
    }
}

// Helper function to append text with a specific class
function appendText(element, text, className) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    element.appendChild(span);
}

// Run order calculation
function runOrder() {
    // 1. Get user inputs
    const [selectedModule, quantity, sunlightMultiplier] = getUserInputs();
    if (selectedModule === null) return;
    
    // 2. Special case for Scrap Recycler
    if (selectedModule === "Scrap Recycler") {
        const results = calculateScrapRecycler(quantity, sunlightMultiplier);
        
        // Run negative surplus correction for Scrap Recycler
        const adjustedResults = checkAndAdjustSurplus(
            selectedModule,
            quantity,
            sunlightMultiplier,
            results.requiredModules
        );
        
        // If adjustments were made, we need to recalculate everything with the new counts
        if (adjustedResults !== results.requiredModules) {
            // Re-run the scrap recycler calculation with adjusted module counts
            const newResults = calculateScrapRecycler(quantity, sunlightMultiplier);
            // The negative surplus correction is already done in checkAndAdjustSurplus
            // and it returns the final adjusted modules
            
            // Update the results with the adjusted values
            newResults.requiredModules = adjustedResults;
            
            // Recalculate raw resources with the adjusted module counts
            newResults.rawResourceRequirements = {};
            for (const [moduleName, moduleCount] of Object.entries(adjustedResults)) {
                const moduleInfo = getModuleVariant(moduleName, filterDropdown.value);
                for (const resourceDict of moduleInfo.raw_resources) {
                    for (const [resourceName, resourceAmount] of Object.entries(resourceDict)) {
                        const resourceAmountNeeded = resourceAmount * moduleCount;
                        newResults.rawResourceRequirements[resourceName] = 
                            (newResults.rawResourceRequirements[resourceName] || 0) + resourceAmountNeeded;
                    }
                }
            }
            
            // Recalculate storage requirements
            newResults.storagePerWare = calculateStoragePerWareRequirements(
                adjustedResults,
                newResults.rawResourceRequirements,
                sunlightMultiplier
            );
            newResults.storageTotals = calculateStorageTotalRequirement(newResults.storagePerWare);
            
            // Display the final results
            displayResults(
                selectedModule,
                quantity,
                sunlightMultiplier,
                newResults.requiredModules,
                newResults.rawResourceRequirements,
                newResults.storagePerWare,
                newResults.storageTotals
            );
            return;
        }
        
        // Display the final results
        displayResults(
            selectedModule,
            quantity,
            sunlightMultiplier,
            results.requiredModules,
            results.rawResourceRequirements,
            results.storagePerWare,
            results.storageTotals
        );
        return;
    }
    
    // 3. Calculate production rates and raw resources (with rounded-up module counts for raw resources)
    const { productionRates, rawResourceRequirements } = calculateChainProduction(
        selectedModule, 
        quantity, 
        sunlightMultiplier
    );
    
    // 4. Calculate required modules (rounded up)
    const initialRequiredModules = {};
    for (const [moduleName, productionRate] of Object.entries(productionRates)) {
        if (modules[moduleName]) {
            const moduleInfo = getModuleVariant(moduleName, filterDropdown.value);
            let moduleOutputRate;
            if (moduleName === "Energy Cells") {
                moduleOutputRate = moduleInfo.produced * sunlightMultiplier;
            } else {
                moduleOutputRate = moduleInfo.produced;
            }
            const modulesRequired = productionRate / moduleOutputRate;
            initialRequiredModules[moduleName] = Math.ceil(modulesRequired);
        }
    }
    
    // 5. Calculate demand rates using rounded-up module counts
    const consumptionRates = calculateChainDemand(initialRequiredModules, sunlightMultiplier);
    
    // 6. Recalculate required modules based on demand (rounded up)
    const requiredModules = calculateRequiredModules(productionRates, consumptionRates, sunlightMultiplier);
    
    // 7. Recalculate raw resources with final rounded module counts to ensure consistency
    const finalRawResourceRequirements = {};
    for (const [moduleName, moduleCount] of Object.entries(requiredModules)) {
        const moduleInfo = getModuleVariant(moduleName, filterDropdown.value);
        for (const resourceDict of moduleInfo.raw_resources) {
            for (const [resourceName, resourceAmount] of Object.entries(resourceDict)) {
                const resourceAmountNeeded = resourceAmount * moduleCount;
                finalRawResourceRequirements[resourceName] = 
                    (finalRawResourceRequirements[resourceName] || 0) + resourceAmountNeeded;
            }
        }
    }
    
    // 8. Calculate storage requirements per ware
    const storagePerWare = calculateStoragePerWareRequirements(
        requiredModules, 
        finalRawResourceRequirements, 
        sunlightMultiplier
    );
    
    // 9. Calculate total storage requirements
    const storageTotals = calculateStorageTotalRequirement(storagePerWare);
    
    // 10. Correction of Display Values
    const adjustedModules = checkAndAdjustSurplus(
        selectedModule, 
        quantity, 
        sunlightMultiplier, 
        requiredModules
    );
    
    // 11. Display all results
    displayResults(
        selectedModule,
        quantity,
        sunlightMultiplier,
        adjustedModules,
        finalRawResourceRequirements,
        storagePerWare,
        storageTotals
    );
}

// Initialize the app
function initializeApp() {
    initializeModuleDropdown();
    updateColorScheme();
    
    // Set up event listeners
    calculateButton.addEventListener('click', runOrder);
    advancedCheckbox.addEventListener('change', toggleAdvancedView);
    colorSchemeButton.addEventListener('click', toggleColorScheme);
    filterDropdown.addEventListener('change', () => {
        if (moduleDropdown.value !== "Pick a Module") {
            runOrder();
        }
    });
}

// Start the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);