const NORFAM_BACKEND = "https://nordiskfamiljebok.dh.gu.se/api";

export async function search(query, fulltext) {
  const mode = fulltext ? "t" : "k";
  const url = `${NORFAM_BACKEND}/api/query/?q=${query}&m=${mode}`;
  return [
    fetch(`${url}&v=1`).then(formatResponse),
    fetch(`${url}&v=2`).then(formatResponse),
  ];
}

async function formatResponse(response) {
  const json = await response.json();
  return json.map(formatHit);
}

function formatHit(hit) {
  return {
    id: hit.doc_id,
    title: hit.doc_keyword,
    summary: hit.doc_abstr,
    body: hit.doc_text,
    suppl: hit.doc_suppl,
  };
}
