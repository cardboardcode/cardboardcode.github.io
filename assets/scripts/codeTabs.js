/*
 * codeTabs.js — sync enhancements for _includes/tabbed-code.html.
 *
 * Synced groups (shared `sync` name) share a radio name, so the browser
 * natively keeps their radios in lockstep: checking one unchecks the
 * others and fires a "change" event. This script listens for those
 * events and, for EVERY group sharing that radio name (or the group
 * itself when there is no name), shows the pane at the selected index,
 * highlights its label, and points the bar's Copy button at the ACTIVE
 * pane's code (the button ships with the first/default snippet baked in
 * at build time, but copies should follow the visible distro). It also
 * runs an initial render so the state is consistent on load.
 */
(function () {
  "use strict";

  const groups = Array.from(document.querySelectorAll(".code-tabs"));
  if (groups.length === 0) return;

  const renderGroup = (group, index) => {
    group.querySelectorAll(".code-tab-pane").forEach((pane) => {
      pane.classList.toggle(
        "code-tab-pane-shown",
        Number(pane.dataset.index) === index
      );
    });
    group.querySelectorAll(".code-tabs-label").forEach((label) => {
      label.classList.toggle(
        "code-tabs-label-active",
        Number(label.dataset.index) === index
      );
    });
    const copyButton = group.querySelector(".code-tabs-copy");
    const activePane = group.querySelector(
      '.code-tab-pane[data-index="' + index + '"]'
    );
    if (copyButton && activePane) {
      copyButton.setAttribute("data-code", activePane.textContent.trim());
    }
  };

  // Resolve the active tab index for a group: its own checked radio if
  // any, otherwise the checked radio among radios sharing its name,
  // otherwise the first tab.
  const groupIndex = (group) => {
    const firstRadio = group.querySelector(".code-tabs-radio");
    if (!firstRadio) return null;
    const ownChecked = group.querySelector(".code-tabs-radio:checked");
    if (ownChecked) return Number(ownChecked.dataset.index);
    if (firstRadio.name) {
      const familyChecked = document.querySelector(
        '.code-tabs-radio[name="' +
          firstRadio.name +
          '"]:checked[data-index]'
      );
      if (familyChecked) return Number(familyChecked.dataset.index);
    }
    return Number(firstRadio.dataset.index);
  };

  // Initialize all groups on load.
  groups.forEach((group) => {
    const index = groupIndex(group);
    if (index !== null) renderGroup(group, index);
  });

  // One listener per radio: on change, apply its index to its sync family.
  document.querySelectorAll(".code-tabs-radio").forEach((radio) => {
    radio.addEventListener("change", () => {
      if (!radio.checked) return;
      const index = Number(radio.dataset.index);
      const sibs = radio.name
        ? [
            ...document.querySelectorAll(
              '.code-tabs-radio[name="' + radio.name + '"]'
            ),
            radio,
          ]
        : [radio];
      sibs.forEach((sibling) => {
        const g = sibling.closest(".code-tabs");
        if (g) renderGroup(g, index);
      });
    });
  });
})();
