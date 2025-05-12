document.addEventListener('DOMContentLoaded', () => {
    const unitTags = ['Machine Damage', 'Infantry Damage', 'Ranged Damage', 'Mounted Damage'];
    const traitTags = ['Machine Damage', 'Infantry Damage', 'Ranged Damage', 'Mounted Damage'];

    // Populate dropdown for Unit Tags
    const unitTagsSelect = document.getElementById('unitTagsSelect');
    unitTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        unitTagsSelect.appendChild(option);
    });

    // Populate dropdown for Trait Tags
    const traitTagsSelect = document.getElementById('traitTagsSelect');
    traitTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        traitTagsSelect.appendChild(option);
    });
});

let units = [];
let traits = [];
let currentUnitIndex = -1;
let currentTraitIndex = -1;

// Add Unit function
function addUnit() {
    const unitName = document.getElementById('unitName').value;
    const unitHp = parseInt(document.getElementById('unitHp').value);
    const unitDmg = parseInt(document.getElementById('unitDmg').value);
    const unitCount = parseInt(document.getElementById('unitCount').value);
    const selectedTags = Array.from(document.getElementById('unitTagsSelect').selectedOptions).map(option => option.value);

    if (!unitName || isNaN(unitHp) || isNaN(unitDmg) || isNaN(unitCount)) {
        alert("Please fill in all fields with valid values.");
        return;
    }
    
    if (units.some(unit => unit.unitName === unitName)) {
        alert("Duplicate unit name is not allowed.");
        return;
    }

    const unit = { unitName, unitHp, unitDmg, unitCount, selectedTags };
    units.push(unit);

    // Display the unit in the list
    const unitList = document.getElementById('unitList');
    const li = document.createElement('li');
    li.textContent = `${unit.unitName} - HP: ${unit.unitHp}, Dmg: ${unit.unitDmg}, Count: ${unit.unitCount}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editUnit(units.length - 1);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeUnit(units.length - 1);

    li.appendChild(editButton);
    li.appendChild(removeButton);
    unitList.appendChild(li);

    // Clear form
    document.getElementById('unitName').value = '';
    document.getElementById('unitHp').value = '';
    document.getElementById('unitDmg').value = '';
    document.getElementById('unitCount').value = '';
    document.getElementById('unitTagsSelect').selectedIndex = -1;

    // Update Unit Selection Dropdown for simulation
    updateUnitDropdown();
}

// Edit Unit function
function editUnit(index) {
    currentUnitIndex = index;
    const unit = units[index];
    
    document.getElementById('editUnitName').value = unit.unitName;
    document.getElementById('editUnitHp').value = unit.unitHp;
    document.getElementById('editUnitDmg').value = unit.unitDmg;
    document.getElementById('editUnitCount').value = unit.unitCount;
    
    // Show popup
    document.getElementById('unitEditPopup').style.display = 'block';
}

// Save Unit Changes
function saveUnitChanges() {
    const editUnitName = document.getElementById('editUnitName').value;
    const editUnitHp = parseInt(document.getElementById('editUnitHp').value);
    const editUnitDmg = parseInt(document.getElementById('editUnitDmg').value);
    const editUnitCount = parseInt(document.getElementById('editUnitCount').value);
    
    if (!editUnitName || isNaN(editUnitHp) || isNaN(editUnitDmg) || isNaN(editUnitCount)) {
        alert("Please fill in all fields with valid values.");
        return;
    }
    
    // Check for duplicate name only if name has changed
    if (editUnitName !== units[currentUnitIndex].unitName && 
        units.some(unit => unit.unitName === editUnitName)) {
        alert("Duplicate unit name is not allowed.");
        return;
    }
    
    units[currentUnitIndex].unitName = editUnitName;
    units[currentUnitIndex].unitHp = editUnitHp;
    units[currentUnitIndex].unitDmg = editUnitDmg;
    units[currentUnitIndex].unitCount = editUnitCount;
    
    // Update display
    const unitList = document.getElementById('unitList');
    const li = unitList.children[currentUnitIndex];
    li.childNodes[0].nodeValue = `${editUnitName} - HP: ${editUnitHp}, Dmg: ${editUnitDmg}, Count: ${editUnitCount}`;
    
    // Update unit dropdown
    updateUnitDropdown();
    
    // Close popup
    closePopup();
}

// Remove Unit function
function removeUnit(index) {
    units.splice(index, 1);
    
    // Update display
    const unitList = document.getElementById('unitList');
    unitList.removeChild(unitList.children[index]);
    
    // Update buttons on remaining list items
    for (let i = 0; i < unitList.children.length; i++) {
        const li = unitList.children[i];
        const editButton = li.children[0];
        const removeButton = li.children[1];
        
        editButton.onclick = () => editUnit(i);
        removeButton.onclick = () => removeUnit(i);
    }
    
    // Update unit dropdown
    updateUnitDropdown();
}

// Add Trait function
function addTrait() {
    const traitName = document.getElementById('traitName').value;
    const traitHpBonus = parseInt(document.getElementById('traitHpBonus').value);
    const traitDmgBonus = parseInt(document.getElementById('traitDmgBonus').value);
    const selectedTags = Array.from(document.getElementById('traitTagsSelect').selectedOptions).map(option => option.value);

    if (!traitName || isNaN(traitHpBonus) || isNaN(traitDmgBonus)) {
        alert("Please fill in all fields with valid values.");
        return;
    }
    
    if (traits.some(trait => trait.traitName === traitName)) {
        alert("Duplicate trait name is not allowed.");
        return;
    }

    const trait = { traitName, traitHpBonus, traitDmgBonus, selectedTags };
    traits.push(trait);

    // Display the trait in the list
    const traitList = document.getElementById('traitList');
    const li = document.createElement('li');
    li.textContent = `${trait.traitName} - HP Bonus: ${trait.traitHpBonus}%, Damage Bonus: ${trait.traitDmgBonus}%`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTrait(traits.length - 1);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeTrait(traits.length - 1);

    li.appendChild(editButton);
    li.appendChild(removeButton);
    traitList.appendChild(li);

    // Clear form
    document.getElementById('traitName').value = '';
    document.getElementById('traitHpBonus').value = '';
    document.getElementById('traitDmgBonus').value = '';
    document.getElementById('traitTagsSelect').selectedIndex = -1;

    // Update Trait Checkboxes for simulation
    updateTraitCheckboxes();
}

// Edit Trait function
function editTrait(index) {
    currentTraitIndex = index;
    const trait = traits[index];
    
    document.getElementById('editTraitName').value = trait.traitName;
    document.getElementById('editTraitHpBonus').value = trait.traitHpBonus;
    document.getElementById('editTraitDmgBonus').value = trait.traitDmgBonus;
    
    // Show popup
    document.getElementById('traitEditPopup').style.display = 'block';
}

// Save Trait Changes
function saveTraitChanges() {
    const editTraitName = document.getElementById('editTraitName').value;
    const editTraitHpBonus = parseInt(document.getElementById('editTraitHpBonus').value);
    const editTraitDmgBonus = parseInt(document.getElementById('editTraitDmgBonus').value);
    
    if (!editTraitName || isNaN(editTraitHpBonus) || isNaN(editTraitDmgBonus)) {
        alert("Please fill in all fields with valid values.");
        return;
    }
    
    // Check for duplicate name only if name has changed
    if (editTraitName !== traits[currentTraitIndex].traitName && 
        traits.some(trait => trait.traitName === editTraitName)) {
        alert("Duplicate trait name is not allowed.");
        return;
    }
    
    traits[currentTraitIndex].traitName = editTraitName;
    traits[currentTraitIndex].traitHpBonus = editTraitHpBonus;
    traits[currentTraitIndex].traitDmgBonus = editTraitDmgBonus;
    
    // Update display
    const traitList = document.getElementById('traitList');
    const li = traitList.children[currentTraitIndex];
    li.childNodes[0].nodeValue = `${editTraitName} - HP Bonus: ${editTraitHpBonus}%, Damage Bonus: ${editTraitDmgBonus}%`;
    
    // Update trait checkboxes
    updateTraitCheckboxes();
    
    // Close popup
    closePopup();
}

// Remove Trait function
function removeTrait(index) {
    traits.splice(index, 1);
    
    // Update display
    const traitList = document.getElementById('traitList');
    traitList.removeChild(traitList.children[index]);
    
    // Update buttons on remaining list items
    for (let i = 0; i < traitList.children.length; i++) {
        const li = traitList.children[i];
        const editButton = li.children[0];
        const removeButton = li.children[1];
        
        editButton.onclick = () => editTrait(i);
        removeButton.onclick = () => removeTrait(i);
    }
    
    // Update trait checkboxes
    updateTraitCheckboxes();
}

// Close Popup function
function closePopup() {
    document.getElementById('unitEditPopup').style.display = 'none';
    document.getElementById('traitEditPopup').style.display = 'none';
    currentUnitIndex = -1;
    currentTraitIndex = -1;
}

// Update Trait Checkboxes for Simulation
function updateTraitCheckboxes() {
    const traitSelect = document.getElementById('traitSelect');
    traitSelect.innerHTML = '';
    traits.forEach(trait => {
        const option = document.createElement('option');
        option.value = trait.traitName;
        option.textContent = trait.traitName;
        traitSelect.appendChild(option);
    });
}

// Update Unit Dropdown for Simulation
function updateUnitDropdown() {
    const unitDropdown = document.getElementById('selectedUnit');
    unitDropdown.innerHTML = '<option value="">Select a Unit</option>';
    units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit.unitName;
        option.textContent = unit.unitName;
        unitDropdown.appendChild(option);
    });
}

// Run Simulation
function runSimulation() {
    const selectedUnitName = document.getElementById('selectedUnit').value;
    const selectedUnit = units.find(unit => unit.unitName === selectedUnitName);
    if (!selectedUnit) {
        alert("Please select a valid unit for the simulation.");
        return;
    }

    const selectedTraits = Array.from(document.getElementById('traitSelect').selectedOptions).map(option => option.value);
    const appliedTraits = traits.filter(trait => selectedTraits.includes(trait.traitName));

    let totalHpBonus = 0;
    let totalDmgBonus = 0;
    appliedTraits.forEach(trait => {
        totalHpBonus += trait.traitHpBonus;
        totalDmgBonus += trait.traitDmgBonus;
    });

    const finalHp = selectedUnit.unitHp * (1 + totalHpBonus / 100);
    const finalDmg = selectedUnit.unitDmg * (1 + totalDmgBonus / 100);
    const totalHp = finalHp * selectedUnit.unitCount;
    const totalDmg = finalDmg * selectedUnit.unitCount;
    
    const result = `
    Simulation Results:
    Unit: ${selectedUnit.unitName}
    Final HP per unit: ${finalHp.toFixed(2)}
    Final Damage per unit: ${finalDmg.toFixed(2)}
    Total HP (${selectedUnit.unitCount} units): ${totalHp.toFixed(2)}
    Total Damage (${selectedUnit.unitCount} units): ${totalDmg.toFixed(2)}
    Traits applied: ${selectedTraits.length > 0 ? selectedTraits.join(', ') : 'None'}
    `;

    document.getElementById('result').textContent = result;
}