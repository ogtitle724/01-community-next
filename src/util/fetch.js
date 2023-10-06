class Fetch {
  constructor() {
    this.defaultOptions = {
      mode: "cors",
      credentials: "include",
      xhrFields: { withCredentials: true },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    };
    this.domain = process.env.NEXT_PUBLIC_DOMAIN;
  }

  //intercept response and set auth header
  async interceptRes(res) {
    const authHeader = res.headers.get("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];
    console.log("access:", accessToken);

    if (accessToken) {
      this.defaultOptions.headers.Authorization = `Bearer ${accessToken}`;
      //TODO: 토크 파싱한담에 소켓 연결
    }
    return res;
  }

  async request(path, options = {}) {
    const url = this.domain + path;
    const newOptions = JSON.parse(JSON.stringify(this.defaultOptions));
    console.log(newOptions);
    Object.keys(options).forEach((attr) => {
      if (typeof options[attr] === "object") {
        newOptions[attr] = { ...newOptions[attr], ...options[attr] };
      } else {
        newOptions[attr] = options[attr];
      }
    });

    console.log("req:", newOptions);
    try {
      let res = await fetch(url, newOptions);
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      res = await this.interceptRes(res);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  async get(path, options = {}) {
    return this.request(path, { ...options, method: "GET" });
  }

  async post(path, data, options = {}) {
    return this.request(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(path, data, options = {}) {
    return this.request(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch(path, data, options = {}) {
    return this.request(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete(path, options = {}) {
    return this.request(path, { ...options, method: "DELETE" });
  }
}

// Export a single instance of the CustomFetch class
// eslint-disable-next-line import/no-anonymous-default-export
let fetchIns = new Fetch();
export default fetchIns;
