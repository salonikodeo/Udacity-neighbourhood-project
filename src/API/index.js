class Helper {
	static baseURL() {
		return "https://api.foursquare.com/v2";
	}
	static auth() {
		const keys = {
			client_id: "GZW23AP4MZ5N5TPYFXWICJMZDGCQVHKMOXLAFLNCOQUZO3PA",
			client_secret: "CWCZRBRASQDLLMMVO3NKYQ5LLBPX1AQGKNMINMUN1RM0DYVB",
			v: "20181119",
			near: "Bhopal, India"
		}
		return Object.keys(keys)
			.map(key => `${key}=${keys[key]}`)
			.join("&");
	}
	static urlBuilder(urlPrams) {
		if(!urlPrams) {
			return "";
		}
		return Object.keys(urlPrams)
			.map(key => `${key} = ${urlPrams[key]}`)
			.join("&");
	}
	static headers() {
		return {
			Accept: "application/json"
		}
	}
	static simpleFetch(endPoint,method,urlPrams) {
		let requestData = {
			method, 
			headers: Helper.headers()
		};
		return fetch(
			`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
				urlPrams
			)}`,
			requestData
		).then(res => res.json());
	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return Helper.simpleFetch("/venues/search", "GET", urlPrams);
	}
	static getVenueDetails(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET")
	}
	static getVenuePhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}