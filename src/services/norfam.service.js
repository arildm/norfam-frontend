const NORFAM_BACKEND = "https://nordiskfamiljebok.dh.gu.se/api";

export async function search(query, fulltext) {
  const mode = fulltext ? "t" : "k";
  const url = `${NORFAM_BACKEND}/api/query/?q=${query}&m=${mode}`;
  const formatResponse = async (response) =>
    (await response.json()).map(formatHit);
  return [
    fetch(`${url}&v=1`).then(formatResponse),
    fetch(`${url}&v=2`).then(formatResponse),
  ];
}

export async function getArticle(version, id) {
  return fetch(`${NORFAM_BACKEND}/api/documents/${id}/?v=${version}`)
    .then((response) => response.json())
    .then(formatHit);
}

function formatHit(hit) {
  return {
    id: hit.doc_id,
    title: hit.doc_keyword,
    summary: hit.doc_abstr,
    body: hit.doc_text && trimLineBreaks(hit.doc_text),
    suppl: hit.doc_suppl,
  };
}

function trimLineBreaks(txt) {
  return txt.replace(/(<br>\s*){3,}/, "<br><br>");
}
