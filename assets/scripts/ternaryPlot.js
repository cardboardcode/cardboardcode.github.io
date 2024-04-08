const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const tooltip = document.querySelector('.tooltip');

// Set circle properties
fighter_radius = 10;
fighter_color = 'red';
mage_radius = 10;
mage_color = 'green';
rogue_radius = 10;
rogue_color = 'blue';

const border_padding = 30

// Draw the labelled node
function drawLabelledNode(x, y, radius, color, labelText) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false); // Full circle
  ctx.fillStyle = color;
  ctx.fill();

  labelFontSize = 10;
  labelYOffset = radius + labelFontSize + 5;
  ctx.font = `${labelFontSize}px Arial`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(labelText, x, y + labelYOffset);
}

// Function to animate a floating node
function animateFloatingNode() {
  let yOffset = 0;

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add a slight wave-like motion
    yOffset = (Math.sin(Date.now() / 500)) + 10;

    // Draw pillar nodes
    drawLabelledNode(30, 730 + yOffset, rogue_radius, rogue_color, 'ROGUE');
    drawLabelledNode(730, 730 + yOffset, mage_radius, mage_color, 'MAGE');
    drawLabelledNode(380, 30 + yOffset, fighter_radius, fighter_color, 'FIGHTER');

    y_step = 35

    middle_pos_x = 380
    x_buffer = 36
    start_pos_y = 700
    drawLabelledNode((middle_pos_x - (x_buffer * 9)), start_pos_y + yOffset, 5, 'grey', "Thief")
    drawLabelledNode((middle_pos_x - x_buffer * 7), start_pos_y + yOffset, 5, 'grey', "Cat Burglar")
    drawLabelledNode((middle_pos_x - x_buffer * 5), start_pos_y + yOffset, 5, 'grey', "Stalker")
    drawLabelledNode((middle_pos_x - x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Trickster")
    drawLabelledNode((middle_pos_x - x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Shadowmancer")
    drawLabelledNode((middle_pos_x + x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Binder")
    drawLabelledNode((middle_pos_x + x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Illusionist")
    drawLabelledNode((middle_pos_x + x_buffer * 5), start_pos_y + yOffset, 5, 'grey', "Stuv")
    drawLabelledNode((middle_pos_x + x_buffer * 7), start_pos_y + yOffset, 5, 'grey', "Witch")
    drawLabelledNode((middle_pos_x + (x_buffer * 9)), start_pos_y + yOffset, 5, 'grey', "Wizard")
    start_pos_y = 700 - y_step
    drawLabelledNode((middle_pos_x - (x_buffer * 8)), start_pos_y + yOffset, 5, 'grey', "Infiltrator")
    drawLabelledNode((middle_pos_x - x_buffer * 6), start_pos_y + yOffset, 5, 'grey', "Philanderer")
    drawLabelledNode((middle_pos_x - x_buffer * 4), start_pos_y + yOffset, 5, 'grey', "Chemiston")
    drawLabelledNode((middle_pos_x - x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Magician")
    drawLabelledNode((middle_pos_x), start_pos_y + yOffset, 5, 'grey', "Alchemist")
    drawLabelledNode((middle_pos_x + x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Conjurer")
    drawLabelledNode((middle_pos_x + x_buffer * 4), start_pos_y + yOffset, 5, 'grey', "Shaman")
    drawLabelledNode((middle_pos_x + x_buffer * 6), start_pos_y + yOffset, 5, 'grey', "Arsonist")
    drawLabelledNode((middle_pos_x + (x_buffer * 8)), start_pos_y + yOffset, 5, 'grey', "Sorcerer")
    start_pos_y = 700 - (y_step * 2)
    drawLabelledNode((middle_pos_x - (x_buffer * 8)), start_pos_y + yOffset, 5, 'grey', "Highway Man")
    drawLabelledNode((middle_pos_x - x_buffer * 6), start_pos_y + yOffset, 5, 'grey', "Spy")
    drawLabelledNode((middle_pos_x - x_buffer * 4), start_pos_y + yOffset, 5, 'grey', "Trap Master")
    drawLabelledNode((middle_pos_x - x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Gambler")
    drawLabelledNode((middle_pos_x), start_pos_y + yOffset, 5, 'grey', "Tinker")
    drawLabelledNode((middle_pos_x + x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Animist")
    drawLabelledNode((middle_pos_x + x_buffer * 4), start_pos_y + yOffset, 5, 'grey', "Dreamwalker")
    drawLabelledNode((middle_pos_x + x_buffer * 6), start_pos_y + yOffset, 5, 'grey', "Sage")
    drawLabelledNode((middle_pos_x + (x_buffer * 8)), start_pos_y + yOffset, 5, 'grey', "Warlock")
    start_pos_y = 700 - (y_step * 3)
    drawLabelledNode((middle_pos_x - (x_buffer * 7)), start_pos_y + yOffset, 5, 'grey', "Ballistician")
    drawLabelledNode((middle_pos_x - x_buffer * 5), start_pos_y + yOffset, 5, 'grey', "Poisoner")
    drawLabelledNode((middle_pos_x - x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Dark Delver")
    drawLabelledNode((middle_pos_x - x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Mentalist")
    drawLabelledNode((middle_pos_x + x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Technomancer")
    drawLabelledNode((middle_pos_x + x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Geomancer")
    drawLabelledNode((middle_pos_x + x_buffer * 5), start_pos_y + yOffset, 5, 'grey', "Channeler")
    drawLabelledNode((middle_pos_x + (x_buffer * 7)), start_pos_y + yOffset, 5, 'grey', "Theurge")
    start_pos_y = 700 - (y_step * 4)
    drawLabelledNode((middle_pos_x - (x_buffer * 7)), start_pos_y + yOffset, 5, 'grey', "Cat Purse")
    drawLabelledNode((middle_pos_x - x_buffer * 5), start_pos_y + yOffset, 5, 'grey', "Hunter")
    drawLabelledNode((middle_pos_x - x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Beastmaster")
    drawLabelledNode((middle_pos_x - x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Serider")
    drawLabelledNode((middle_pos_x + x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Enchanter")
    drawLabelledNode((middle_pos_x + x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Psion")
    drawLabelledNode((middle_pos_x + x_buffer * 5), start_pos_y + yOffset, 5, 'grey', "Necromancer")
    drawLabelledNode((middle_pos_x + (x_buffer * 7)), start_pos_y + yOffset, 5, 'grey', "Acolyte")
    start_pos_y = 700 - (y_step * 5)
    drawLabelledNode((middle_pos_x - (x_buffer * 6)), start_pos_y + yOffset, 5, 'grey', "Scout")
    drawLabelledNode((middle_pos_x - x_buffer * 4), start_pos_y + yOffset, 5, 'grey', "Explorer")
    drawLabelledNode((middle_pos_x - x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Horizon Walker")
    drawLabelledNode((middle_pos_x), start_pos_y + yOffset, 5, 'grey', "Lore Master")
    drawLabelledNode((middle_pos_x + x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Summoner")
    drawLabelledNode((middle_pos_x + x_buffer * 4), start_pos_y + yOffset, 5, 'grey', "Elementalist")
    drawLabelledNode((middle_pos_x + (x_buffer * 6)), start_pos_y + yOffset, 5, 'grey', "Druid")
    start_pos_y = 700 - (y_step * 6)
    drawLabelledNode((middle_pos_x - (x_buffer * 6)), start_pos_y + yOffset, 5, 'grey', "Bandit")
    drawLabelledNode((middle_pos_x - x_buffer * 4), start_pos_y + yOffset, 5, 'grey', "Assassin")
    drawLabelledNode((middle_pos_x - x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Ninja")
    drawLabelledNode((middle_pos_x), start_pos_y + yOffset, 5, 'grey', "Bard")
    drawLabelledNode((middle_pos_x + x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Arcane Archer")
    drawLabelledNode((middle_pos_x + x_buffer * 4), start_pos_y + yOffset, 5, 'grey', "Blue Mage")
    drawLabelledNode((middle_pos_x + (x_buffer * 6)), start_pos_y + yOffset, 5, 'grey', "Battle Priest")
    start_pos_y = 700 - (y_step * 7)
    drawLabelledNode((middle_pos_x - (x_buffer * 5)), start_pos_y + yOffset, 5, 'grey', "Gunslinger")
    drawLabelledNode((middle_pos_x - x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Ranger")
    drawLabelledNode((middle_pos_x - x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Merchant")
    drawLabelledNode((middle_pos_x + x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Dancer")
    drawLabelledNode((middle_pos_x + x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Red Mage")
    drawLabelledNode((middle_pos_x + (x_buffer * 5)), start_pos_y + yOffset, 5, 'grey', "Clerk")
    start_pos_y = 700 - (y_step * 8)
    drawLabelledNode((middle_pos_x - (x_buffer * 5)), start_pos_y + yOffset, 5, 'grey', "Marksman")
    drawLabelledNode((middle_pos_x - x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Marauder")
    drawLabelledNode((middle_pos_x - x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Adventurer")
    drawLabelledNode((middle_pos_x + x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Diplomat")
    drawLabelledNode((middle_pos_x + x_buffer * 3), start_pos_y + yOffset, 5, 'grey', "Spellsword")
    drawLabelledNode((middle_pos_x + (x_buffer * 5)), start_pos_y + yOffset, 5, 'grey', "Battle Mage")
    start_pos_y = 700 - (y_step * 9)
    drawLabelledNode((middle_pos_x - (x_buffer * 4)), start_pos_y + yOffset, 5, 'grey', "Duelist")
    drawLabelledNode((middle_pos_x - x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Raider")
    drawLabelledNode((middle_pos_x), start_pos_y + yOffset, 5, 'grey', "Strategist")
    drawLabelledNode((middle_pos_x + x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Templar")
    drawLabelledNode((middle_pos_x + (x_buffer * 4)), start_pos_y + yOffset, 5, 'grey', "Death Knight")
    start_pos_y = 700 - (y_step * 10)
    drawLabelledNode((middle_pos_x - (x_buffer * 4)), start_pos_y + yOffset, 5, 'grey', "Archer")
    drawLabelledNode((middle_pos_x - x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Beast Rider")
    drawLabelledNode((middle_pos_x), start_pos_y + yOffset, 5, 'grey', "Warlord")
    drawLabelledNode((middle_pos_x + x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Inquisitor")
    drawLabelledNode((middle_pos_x + (x_buffer * 4)), start_pos_y + yOffset, 5, 'grey', "Paladin")
    start_pos_y = 700 - (y_step * 11)
    drawLabelledNode((middle_pos_x - (x_buffer * 3)), start_pos_y + yOffset, 5, 'grey', "Corsair")
    drawLabelledNode((middle_pos_x - x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Ronin")
    drawLabelledNode((middle_pos_x + x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Herald")
    drawLabelledNode((middle_pos_x + (x_buffer * 3)), start_pos_y + yOffset, 5, 'grey', "Blade Singer")
    start_pos_y = 700 - (y_step * 12)
    drawLabelledNode((middle_pos_x - (x_buffer * 3)), start_pos_y + yOffset, 5, 'grey', "Fencer")
    drawLabelledNode((middle_pos_x - x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Samurai")
    drawLabelledNode((middle_pos_x + x_buffer * 1), start_pos_y + yOffset, 5, 'grey', "Monk")
    drawLabelledNode((middle_pos_x + (x_buffer * 3)), start_pos_y + yOffset, 5, 'grey', "Dark Knight")
    start_pos_y = 700 - (y_step * 13)
    drawLabelledNode((middle_pos_x - x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Soldier")
    drawLabelledNode((middle_pos_x), start_pos_y + yOffset, 5, 'grey', "Martial Artist")
    drawLabelledNode((middle_pos_x + x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Dragon Knight")
    start_pos_y = 700 - (y_step * 14)
    drawLabelledNode((middle_pos_x - x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Pugilist")
    drawLabelledNode((middle_pos_x), start_pos_y + yOffset, 5, 'grey', "Weapon Master")
    drawLabelledNode((middle_pos_x + x_buffer * 2), start_pos_y + yOffset, 5, 'grey', "Sentinel")
    start_pos_y = 700 - (y_step * 15)
    drawLabelledNode((middle_pos_x - x_buffer), start_pos_y + yOffset, 5, 'grey', "Shield Bearer")
    drawLabelledNode((middle_pos_x + x_buffer), start_pos_y + yOffset, 5, 'grey', "Dragoon")
    start_pos_y = 700 - (y_step * 16)
    drawLabelledNode((middle_pos_x - x_buffer), start_pos_y + yOffset, 5, 'grey', "Cavalier")
    drawLabelledNode((middle_pos_x + x_buffer), start_pos_y + yOffset, 5, 'grey', "Berserker")
    drawLabelledNode(middle_pos_x, 700 - (y_step * 17) + yOffset, 5, 'grey', "Knight")
    drawLabelledNode(middle_pos_x, 700 - (y_step * 18) + yOffset, 5, 'grey', "Warrior")

    requestAnimationFrame(drawFrame);
  }

  drawFrame();
}

// Main nodes
animateFloatingNode();