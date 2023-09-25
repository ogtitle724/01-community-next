class Fetch {
  constructor() {
    this.defaultOptions = {
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    };
    this.domain = process.env.NEXT_PUBLIC_DOMAIN;
  }

  //intercept response and set auth header
  async setAuthHeader(res) {
    const authHeader = res.headers.get("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (accessToken) {
      console.log(authHeader);
      this.defaultOptions.headers.Authorization = `Bearer ${accessToken}`;
    }
    return res;
  }

  async request(path, options = {}) {
    const url = this.domain + path;

    options.headers = { ...this.defaultOptions.headers, ...options.headers };
    console.log(options);

    try {
      let res = await fetch(url, options);
      res = await this.setAuthHeader(res);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async get(path, options = {}) {
    options.headers = {
      Accept: "application/json",
      ...options.headers,
    };
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
