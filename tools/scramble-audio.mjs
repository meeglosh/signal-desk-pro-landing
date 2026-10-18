// Scrambles an audio file so the published copy isn't directly playable.
// The page unscrambles it in memory with the same keystream before decoding.
//   node tools/scramble-audio.mjs <input.mp3> assets/sd.bin
import { readFileSync, writeFileSync } from 'node:fs';

const SEED = 0x5d1a7c3b;   // must match the page

export function keystream(bytes, seed = SEED) {
  let x = seed >>> 0;
  for (let i = 0; i < bytes.length; i++) {
    x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0;   // xorshift32
    bytes[i] ^= x & 0xff;
  }
  return bytes;
}

const [, , input, output] = process.argv;
if (input && output) writeFileSync(output, keystream(new Uint8Array(readFileSync(input))));
