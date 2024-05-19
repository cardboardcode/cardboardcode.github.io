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

// Define dictionary of character classes
const textArray = [
  ["Thief", "Cat Burglar", "Stalker", "Trickster", "Shadowmancer", "Binder", "Illusionist", "Stuv", "Witch", "Wizard"], // Bottommost row with text strings
  ["This", "is", "row", "2"], // Second row with text strings
  // Add more rows as needed
];

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

  // ctx.addEventListener('mousemove', (event) => {
  //   labelFontSize = 8;
  //   labelYOffset = radius + labelFontSize + 5;
  //   ctx.font = `${labelFontSize}px Arial`;
  //   ctx.fillStyle = 'white';
  //   ctx.textAlign = 'center';
  //   ctx.fillText(labelText, x, y + labelYOffset);
  // });
}

// Main nodes
drawLabelledNode(30, 730, mage_radius, mage_color, 'MAGE');
drawLabelledNode(740, 730, rogue_radius, rogue_color, 'ROGUE');

// limit = 10
// total_plot_height = 700
// start_pos_x = 30
// start_pos_y = 730 - total_plot_height/limit
// x_offset = total_plot_height/limit/2
// for (let j = 0; j <= limit; j++) {
//   for (let i = 1; i <= limit - j; i++) {
//     drawLabelledNode(start_pos_x + i * 710/(limit + 1) + j * x_offset, start_pos_y - j *(total_plot_height/limit - 2), 5, 'grey', '-');
//   }
// }

y_step = 35
x_step = 32
x_sub_step = 64

array1 = ["Thief", "Cat Burglar", "Stalker", "Trickster", "Shadowmancer", "Binder", "Illusionist", "Stuv", "Witch", "Wizard"];
start_pos_x = x_step
start_pos_y = 700 - (y_step * 0)
limit = 10
for (let i = 1; i <= limit; i++) {
  drawLabelledNode(start_pos_x + i * x_sub_step, start_pos_y, 5, 'grey', array1[i-1])
}

array2 = ["Infiltrator", "Philanderer", "Chemiston", "Magician", "Alchemist", "Conjurer", "Shaman", "Arsonist", "Sorcerer"];
start_pos_x = x_step * 2
start_pos_y = 700 - (y_step * 1)
limit = 9
x_offset = 5
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array2[i-1])
}

array3 = ["Highway Man", "Spy", "Trap Master", "Gambler", "Tinker", "Animist", "Dreamwalker", "Sage", "Warlock"];
start_pos_x = x_step * 2
start_pos_y = 700 - (y_step * 2)
limit = 9
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array3[i-1])
}

array = ["Ballistician", "Poisoner", "Dark Delver", "Mentalist", "Technomancer", "Geomancer", "Channeler", "Theurge"];
start_pos_x = x_step * 3
start_pos_y = 700 - (y_step * 3)
limit = 8
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Cat Purse", "Hunter", "Beastmaster", "Serider", "Enchanter", "Psion", "Necromancer", "Acolyte"];
start_pos_x = x_step * 3
start_pos_y = 700 - (y_step * 4)
limit = 8
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Scout", "Explorer", "Horizon Walker", "Lore Master", "Summoner", "Elementalist", "Druid"];
start_pos_x = x_step * 4
start_pos_y = 700 - (y_step * 5)
limit = 7
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Bandit", "Assassin", "Ninja", "Bard", "Arcane Archer", "Blue Mage", "Battle Priest"];
start_pos_x = x_step * 4
start_pos_y = 700 - (y_step * 6)
limit = 7
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Gunslinger", "Ranger", "Merchant", "Dancer", "Red Mage", "Clerk"];
start_pos_x = x_step * 5
start_pos_y = 700 - (y_step * 7)
limit = 6
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Marksman", "Marauder", "Adventurer", "Diplomat", "Spellsword", "Battle Mage"];
start_pos_x = x_step * 5
start_pos_y = 700 - (y_step * 8)
limit = 6
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Duelist", "Raider", "Strategist", "Templar", "Death Knight"];
start_pos_x = x_step * 6
start_pos_y = 700 - (y_step * 9)
limit = 5
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Archer", "Beast Rider", "Warlord", "Inquisitor", "Paladin"];
start_pos_x = x_step * 6
start_pos_y = 700 - (y_step * 10)
limit = 5
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Corsair", "Ronin", "Herald", "Blade Singer"];
start_pos_x = x_step * 7
start_pos_y = 700 - (y_step * 11)
limit = 4
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Fencer", "Samurai", "Monk", "Dark Knight"];
start_pos_x = x_step * 7
start_pos_y = 700 - (y_step * 12)
limit = 4
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Soldier", "Martial Artist", "Dragon Knight"];
start_pos_x = x_step * 8
start_pos_y = 700 - (y_step * 13)
limit = 3
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Pugilist", "Weapon Master", "Sentinel"];
start_pos_x = x_step * 8
start_pos_y = 700 - (y_step * 14)
limit = 3
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Shield Bearer", "Dragoon"];
start_pos_x = x_step * 9
start_pos_y = 700 - (y_step * 15)
limit = 2
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Cavalier", "Berserker"];
start_pos_x = x_step * 9
start_pos_y = 700 - (y_step * 16)
limit = 2
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Knight"];
start_pos_x = x_step * 10
start_pos_y = 700 - (y_step * 17)
limit = 1
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

array = ["Warrior"];
start_pos_x = x_step * 10
start_pos_y = 700 - (y_step * 18)
limit = 1
for (let i = 1; i <= limit; i++) {
  drawLabelledNode((start_pos_x + i * x_sub_step), start_pos_y, 5, 'grey', array[i-1])
}

drawLabelledNode(x_step * 10 + x_sub_step, 700 - (y_step * 19), fighter_radius, fighter_color, 'FIGHTER');