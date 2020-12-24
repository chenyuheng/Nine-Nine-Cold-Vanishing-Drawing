import base64
import json

from lzstring import LZString

metadata = "data:image/png;base64,"
imgs = {}

with open("梅花.png", "rb") as f:
    imgs["梅花"] = metadata + base64.b64encode(f.read()).decode()
with open("亭前垂柳珍重待春风.png", "rb") as f:
    imgs["亭前垂柳珍重待春风"] = metadata + base64.b64encode(f.read()).decode()
imgs["花瓣"] = []
imgs["笔画"] = []
for i in range(81):
    with open(f"花瓣/梅花_00{str(i).zfill(2)}_{str(int(i/9)+1)}-{str(i%9+1)}.png", "rb") as f:
        imgs["花瓣"].append(metadata + base64.b64encode(f.read()).decode())
    with open(f"笔画/亭前垂柳珍重待春风_00{str(i).zfill(2)}_{str(int(i/9)+1)}-{str(i%9+1)}.png", "rb") as f:
        imgs["笔画"].append(metadata + base64.b64encode(f.read()).decode())
json_str = json.dumps(imgs)
lz = LZString()
with open("imgdata", "w", encoding="utf-16") as f:
    f.write(lz.compressToUTF16(json_str))