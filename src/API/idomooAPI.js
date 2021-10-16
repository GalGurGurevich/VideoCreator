
const key = "PiKQ1xfuKC22c1c5c0061af12a240e092d93ec6a47gmckwQGhp6"
const account = "3550"
const storyBoardId = "31193";
const accountKey = account + ":" + key;
const encoded = "Basic " + btoa(accountKey);

const initGet = {
  method: 'GET',
  headers: {
    "Authorization": encoded,
    "Content-Type": "application/json"
  },
};

const initPost = {
  method: 'POST',
  headers: {
    "Authorization": encoded,
    "Content-Type": "application/json"
  },
}

const req = new Request('https://usa-api.idomoo.com/api/v2/storyboards/' + storyBoardId, initGet);

export async function fetchStory() {
    const res = await fetch(req);
    const json = await res.json();
    return json;
}
