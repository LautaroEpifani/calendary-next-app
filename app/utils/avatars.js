import { createAvatar } from "@dicebear/core";
import {
  adventurer,
  adventurerNeutral,
  avataaars,
  avataaarsNeutral,
  bigEars,
  bigEarsNeutral,
  bigSmile,
  bottts,
  botttsNeutral,
  croodles,
  croodlesNeutral,
  funEmoji,
  icons,
  identicon,
  lorelei,
  loreleiNeutral,
  micah,
  miniavs,
  openPeeps,
  personas,
  pixelArt,
  pixelArtNeutral,
  shapes,
  thumbs,
} from "@dicebear/collection";

function getRandomCollection() {
  const collections = [
    adventurer,
    adventurerNeutral,
    avataaars,
    avataaarsNeutral,
    bigEars,
    bigEarsNeutral,
    bigSmile,
    bottts,
    botttsNeutral,
    croodles,
    croodlesNeutral,
    funEmoji,
    icons,
    identicon,
    lorelei,
    loreleiNeutral,
    micah,
    miniavs,
    openPeeps,
    personas,
    pixelArt,
    pixelArtNeutral,
    shapes,
    thumbs,
  ];
  const randomIndex = Math.floor(Math.random() * collections.length);
  return collections[randomIndex];
}

export function generateRandomAvatar() {
  const randomCollection = getRandomCollection();
  return createAvatar(randomCollection, {
    size: 128,
  }).toDataUriSync();
}

