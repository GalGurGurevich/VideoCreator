
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
    "Content-Type": "application/json",
    // "x-idomoo-api-mode": "developer"
  },
}

const reqURL = new Request('https://usa-api.idomoo.com/api/v2/storyboards/' + storyBoardId, initGet);

const postReqURL = new Request('https://usa-api.idomoo.com/api/v2/storyboards/generate', initPost)

export async function fetchStory() {
    const res = await fetch(reqURL);
    const json = await res.json();
    return json;
}

export async function createStory(dataReq = {}) {
    const data = { data: dataReq , storyboard_id: storyBoardId, output: { "video": [{ "video_type": "mp4", "height": 1000}] }};
    const response = await fetch(postReqURL, {
      body: JSON.stringify(data)
    });
    const json = await response.json(); 
    return json;
}

export async function fetchVideoStatus(url) {
    const res = await fetch(url, initGet);
    const json = await res.json(); 
    return json;
}
