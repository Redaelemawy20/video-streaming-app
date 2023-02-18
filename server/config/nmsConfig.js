module.exports = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },

  http: {
    port: 8000,
    allow_origin: "*",
    mediaroot: "./media",
  },
  trans: {
    ffmpeg: "F:/Programs/ffmpeg/bin/ffmpeg.exe",
    tasks: [
      {
        app: "live",
        mp4: true,

        mp4Flags: "[movflags=frag_keyframe+empty_moov]",
      },
    ],
  },
};
