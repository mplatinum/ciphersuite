import { Operation } from './store';

import Base32Encode from '../operations/Base32Encode';
import Base64Encode from '../operations/Base64Encode';
import HexEncode from '../operations/HexEncode';
import CharcodeEncode from '../operations/CharcodeEncode';
import BinaryEncode from '../operations/BinaryEncode';
import A1Z26Encode from '../operations/A1Z26Encode';
import PolybiusSquareEncode from '../operations/PolybiusSquareEncode';
import ADFGVXEncode from '../operations/ADFGVXEncode';
import BifidEncode from '../operations/BifidEncode';
import PlayfairEncode from '../operations/PlayfairEncode';
import RailFenceEncode from '../operations/RailFenceEncode';
import ColumnarTranspositionEncode from '../operations/ColumnarTranspositionEncode';
import Base32Decode from '../operations/Base32Decode';
import Base64Decode from '../operations/Base64Decode';
import HexDecode from '../operations/HexDecode';
import CharcodeDecode from '../operations/CharcodeDecode';
import BinaryDecode from '../operations/BinaryDecode';
import A1Z26Decode from '../operations/A1Z26Decode';
import PolybiusSquareDecode from '../operations/PolybiusSquareDecode';
import ADFGVXDecode from '../operations/ADFGVXDecode';
import BifidDecode from '../operations/BifidDecode';
import PlayfairDecode from '../operations/PlayfairDecode';
import RailFenceDecode from '../operations/RailFenceDecode';
import ColumnarTranspositionDecode from '../operations/ColumnarTranspositionDecode';
import ROT13Encode from '../operations/ROT13Encode';
import ROT13Decode from '../operations/ROT13Decode';
import CaesarEncode from '../operations/CaesarEncode';
import CaesarDecode from '../operations/CaesarDecode';
import AtbashEncode from '../operations/AtbashEncode';
import AtbashDecode from '../operations/AtbashDecode';
import VigenereEncode from '../operations/VigenereEncode';
import VigenereDecode from '../operations/VigenereDecode';
import BeaufortEncode from '../operations/BeaufortEncode';
import BeaufortDecode from '../operations/BeaufortDecode';
import AffineEncode from '../operations/AffineEncode';
import AffineDecode from '../operations/AffineDecode';
import SubstitutionEncode from '../operations/SubstitutionEncode';
import SubstitutionDecode from '../operations/SubstitutionDecode';
import MorseEncode from '../operations/MorseEncode';
import MorseDecode from '../operations/MorseDecode';

export const encipherOps: Operation[] = [
  Base32Encode,
  Base64Encode,
  HexEncode,
  CharcodeEncode,
  BinaryEncode,
  A1Z26Encode,
  ROT13Encode,
  CaesarEncode,
  AtbashEncode,
  PolybiusSquareEncode,
  ADFGVXEncode,
  BifidEncode,
  PlayfairEncode,
  RailFenceEncode,
  ColumnarTranspositionEncode,
  VigenereEncode,
  BeaufortEncode,
  AffineEncode,
  SubstitutionEncode,
  MorseEncode,
].sort((a, b) => (a.slug > b.slug ? 1 : -1));

export const decipherOps: Operation[] = [
  Base32Decode,
  Base64Decode,
  HexDecode,
  CharcodeDecode,
  BinaryDecode,
  A1Z26Decode,
  ROT13Decode,
  CaesarDecode,
  AtbashDecode,
  PolybiusSquareDecode,
  ADFGVXDecode,
  BifidDecode,
  PlayfairDecode,
  RailFenceDecode,
  ColumnarTranspositionDecode,
  VigenereDecode,
  BeaufortDecode,
  AffineDecode,
  SubstitutionDecode,
  MorseDecode,
].sort((a, b) => (a.slug > b.slug ? 1 : -1));
