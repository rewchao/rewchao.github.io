const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const pageUrl = p => "project.html?p=" + slug(p.title);

function el(tag, props = {}, ...children) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function image(src, alt, label = "image") {
  return src
    ? el("img", { className: "img", src, alt })
    : el("div", { className: "img", textContent: label });
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
        image(p.image, p.title),
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
  main.querySelector(".text").append(
    el("h1", { textContent: p.title }),
    el("p", { className: "desc", textContent: p.desc }),
    el("div", { className: "body" }, ...(p.body || []).map(t => el("p", { textContent: t }))));
  renderGallery(p, main.querySelector(".gallery"));
}

// project page gallery: one large image, thumbnails below swap it
function renderGallery(p, box) {
  const pics = p.gallery && p.gallery.length ? p.gallery : [p.image];
  let big = image(pics[0], p.title);
  box.append(big);
  if (pics.length < 2) return;
  const thumbs = el("div", { className: "thumbs" });
  pics.forEach((src, i) => {
    const btn = el("button", { type: "button", className: "thumb", ariaLabel: "show image " + (i + 1) },
      image(src, "", "img " + (i + 1)));
    if (i === 0) btn.setAttribute("aria-current", "true");
    btn.onclick = () => {
      const next = image(src, p.title);
      big.replaceWith(next);
      big = next;
      thumbs.querySelector("[aria-current]").removeAttribute("aria-current");
      btn.setAttribute("aria-current", "true");
    };
    thumbs.append(btn);
  });
  box.append(thumbs);
}

// home page keeps its scroll position when you come back via "← all projects"
function rememberScroll() {
  try {
    const y = sessionStorage.getItem("homeScroll");
    if (y !== null && sessionStorage.getItem("restoreScroll")) {
      window.scrollTo({ top: +y, behavior: "instant" });
    }
    sessionStorage.removeItem("restoreScroll");
  } catch (e) {}
  addEventListener("pagehide", () => {
    try { sessionStorage.setItem("homeScroll", scrollY); } catch (e) {}
  });
}

function backLink(a) {
  a.addEventListener("click", () => {
    try { sessionStorage.setItem("restoreScroll", "1"); } catch (e) {}
  });
}
