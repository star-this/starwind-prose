function defineElement(tagName, elementClass) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, elementClass);
  }
}

function isSafeToken(value) {
  return /^[a-z]+(?:-[a-z]+)*$/.test(value);
}

function normalizeSpaceLike(value) {
  const v = String(value ?? "").trim();
  if (!v) return "";

  if (isSafeToken(v)) {
    return `var(--sw-space-${v})`;
  }

  return v;
}

function applyVar(el, cssVarName, value) {
  if (value === "") {
    el.style.removeProperty(cssVarName);
    return;
  }

  el.style.setProperty(cssVarName, value);
}

function setOrRemoveClass(el, className, on) {
  if (on) el.classList.add(className);
  else el.classList.remove(className);
}

class SwProse extends HTMLElement {
  static get observedAttributes() {
    return [
      "compact",
      "measure",
      "leading",
      "flow",
      "flow-heading",
      "li-gap",
      "list-indent",
      "rule-gap",
      "pre-pad",
      "pre-radius",
      "heading-leading",
      "dt-weight",
    ];
  }

  connectedCallback() {
    // Make the tag behave like a block wrapper by default.
    if (!this.style.display) this.style.display = "block";

    // Ensure existing prose CSS applies (current prose CSS is class-based).
    this.classList.add("sw-prose");

    this.#applyAll();
  }

  attributeChangedCallback() {
    this.#applyAll();
  }

  #applyAll() {
    setOrRemoveClass(this, "sw-prose-compact", this.hasAttribute("compact"));

    applyVar(
      this,
      "--sw-prose-measure",
      this.getAttribute("measure")?.trim() ?? "",
    );

    applyVar(
      this,
      "--sw-prose-leading",
      this.getAttribute("leading")?.trim() ?? "",
    );

    applyVar(
      this,
      "--sw-prose-flow",
      normalizeSpaceLike(this.getAttribute("flow")),
    );

    applyVar(
      this,
      "--sw-prose-flow-heading",
      normalizeSpaceLike(this.getAttribute("flow-heading")),
    );

    applyVar(
      this,
      "--sw-prose-li-gap",
      normalizeSpaceLike(this.getAttribute("li-gap")),
    );

    applyVar(
      this,
      "--sw-prose-list-indent",
      this.getAttribute("list-indent")?.trim() ?? "",
    );

    applyVar(
      this,
      "--sw-prose-rule-gap",
      normalizeSpaceLike(this.getAttribute("rule-gap")),
    );

    applyVar(
      this,
      "--sw-prose-pre-pad",
      normalizeSpaceLike(this.getAttribute("pre-pad")),
    );

    applyVar(
      this,
      "--sw-prose-pre-radius",
      normalizeSpaceLike(this.getAttribute("pre-radius")),
    );

    applyVar(
      this,
      "--sw-prose-heading-leading",
      this.getAttribute("heading-leading")?.trim() ?? "",
    );

    applyVar(
      this,
      "--sw-prose-dt-weight",
      this.getAttribute("dt-weight")?.trim() ?? "",
    );
  }
}

export function defineSwProse() {
  defineElement("sw-prose", SwProse);
}
