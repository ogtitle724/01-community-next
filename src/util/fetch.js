class Fetch {
  constructor() {
    this.defaultOptions = {
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    };
    this.domain = process.env.NEXT_PUBLIC_URL_SVR;
  }

  //intercept response and set auth header
  async interceptRes(res) {
    const authHeader = res.headers.get("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (accessToken) {
      console.log("access token generated");
      this.defaultOptions.headers.Authorization = `Bearer ${accessToken}`;
    }
    return res;
  }

  async request(path, options = {}) {
    const url = this.domain + path;
    console.log(
      "\n----------------------------------------------------------\n"
    );
    console.log(url);
    const newOptions = JSON.parse(JSON.stringify(this.defaultOptions));

    Object.keys(options).forEach((attr) => {
      if (attr === "body") {
        newOptions.body = options[attr];
      } else if (typeof options[attr] === "object") {
        newOptions[attr] = { ...newOptions[attr], ...options[attr] };
      } else {
        newOptions[attr] = options[attr];
      }
    });

    let res = await fetch(url, newOptions);
    if (!res.ok) throw Error(`${res.status} ${res.statusText}`);

    res = await this.interceptRes(res);
    return res;
  }

  async get(path, options = {}) {
    return this.request(path, { ...options, method: "GET" });
  }

  async post(path, data, options = {}) {
    return this.request(path, {
      ...options,
      method: "POST",
      body: data,
    });
  }

  async put(path, data, options = {}) {
    return this.request(path, {
      ...options,
      method: "PUT",
      body: data,
    });
  }

  async patch(path, data, options = {}) {
    return this.request(path, {
      ...options,
      method: "PATCH",
      body: data,
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
