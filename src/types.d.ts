export interface EpisodeType {
    "id": string,
    "rss": string,
    "link": string,
    "audio": string,
    "image": string,
    "podcast": {
        "id": string,
        "image": string,
        "genre_ids": number[],
        "thumbnail": string,
        "listen_score": number,
        "title_original": string,
        "listennotes_url": string,
        "title_highlighted": string,
        "publisher_original": string,
        "publisher_highlighted": string,
        "listen_score_global_rank": string
    },
    "thumbnail": string,
    "pub_date_ms": number,
    "title_original": string,
    "listennotes_url": string,
    "audio_length_sec": number,
    "explicit_content": boolean,
    "title_highlighted": string,
    "description_original": string,
    "description_highlighted": string,
    "transcripts_highlighted": string[]
}

export interface searchResult {
    "took": number,
    "count": number
    "total": number
    "results": EpisodeType[],
    "next_offset": number
}