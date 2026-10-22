const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const pageUrl = p => "project.html?p=" + slug(p.title);

function el(tag, props = {}, ...children) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function image(p) {
  return p.image
    ? el("img", { className: "img", src: p.image, alt: p.title })
    : el("div", { className: "img", textContent: "image" });
}

// sidebar lists, on every page
function renderNav(current) {
  for (const [list, id] of [[projects.current, "nav-current"], [projects.past, "nav-past"]]) {
    for (const p of list) {
      const a = el("a", { href: pageUrl(p), textContent: p.title });
      if (p === current) a.setAttribute("aria-current", "page");
      document.getElementById(id).append(el("li", {}, a));
    }
  }
}

// home page cards
function renderCards(list, mainId, small) {
  for (const p of list) {
    document.getElementById(mainId).append(
      el("a", { className: "project" + (small ? " small" : ""), href: pageUrl(p) },
        image(p),
        el("div", {},
          el("h3", { textContent: p.title }),
          el("p", { textContent: p.desc }),
          el("span", { className: "more", textContent: "view project →" })))
    );
  }
}

// single project page
function renderProject() {
  const key = new URLSearchParams(location.search).get("p");
  const p = [...projects.current, ...projects.past].find(p => slug(p.title) === key);
  renderNav(p);
  const main = document.getElementById("detail");
  if (!p) {
    main.append(el("h1", { textContent: "project not found" }));
    return;
  }
  document.title = p.title + " · andrew chao";
  main.append(
    el("h1", { textContent: p.title }),
    image(p),
    el("p", { className: "desc", textContent: p.desc }),
    el("div", { className: "body" }, ...(p.body || []).map(t => el("p", { textContent: t }))));
}
