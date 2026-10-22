// ---- projects: edit this list; the sidebar, home page and project pages all read from it ----
// image: picture shown on the home page card (e.g. "images/robot.jpg"), or "" for a grey placeholder
// gallery: pictures for the project page (first one shows large); leave [] to use the card image
// body: longer write-up shown on the project's own page (each string is a paragraph)
const projects = {
  current: [
    { title: "project 1", desc: "a short description of what this project is and what you're doing on it.", image: "",
      gallery: ["", "", ""],
      body: ["a longer write-up goes here: what the project is, why you started it, and where it's at.", "add as many paragraphs as you like."] },
    { title: "project 2", desc: "another short description, one or two sentences.", image: "", gallery: [], body: [] },
    { title: "project 3", desc: "placeholder text for a third current project.", image: "", gallery: [], body: [] },
  ],
  past: [
    { title: "past project a", desc: "what it was, and what came out of it.", image: "", gallery: [], body: [] },
    { title: "past project b", desc: "short description of an older project.", image: "", gallery: [], body: [] },
    { title: "past project c", desc: "short description of an older project.", image: "", gallery: [], body: [] },
  ],
};
