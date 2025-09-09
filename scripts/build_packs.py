import csv, json, math, urllib.request, io

VOCAB_URL = 'https://raw.githubusercontent.com/stevnw/JLPT-Vocab/main/vocab.csv'
KANJI_FREQ_URL = 'https://raw.githubusercontent.com/chriskempson/japanese-subtitles-word-kanji-frequency-lists/master/kanji_freq_report.txt'
KANJI_DICT_URL = 'https://raw.githubusercontent.com/felix-ops/kanji-dictionary/master/kanji-dictionary.json'


def fetch(url):
    with urllib.request.urlopen(url) as f:
        return f.read().decode('utf-8-sig')

# Build vocab packs
vocab_csv = fetch(VOCAB_URL)
reader = csv.reader(io.StringIO(vocab_csv))
vocab_entries = []
for row in reader:
    if not row or len(row) < 3:
        continue
    word, reading, meaning = row[0], row[1], row[2]
    vocab_entries.append({'word': word, 'reading': reading, 'meaning': meaning})

pack_size = math.ceil(len(vocab_entries) / 9)
for i in range(9):
    pack = vocab_entries[i*pack_size:(i+1)*pack_size]
    with open(f'data/vocab_{i+1}.json', 'w', encoding='utf-8') as f:
        json.dump(pack, f, ensure_ascii=False)

# Build kanji packs
kanji_freq_text = fetch(KANJI_FREQ_URL)
kanji_dict = json.loads(fetch(KANJI_DICT_URL))
kanji_entries = []
for line in kanji_freq_text.strip().splitlines():
    parts = line.strip().split()
    if len(parts) < 2:
        continue
    kanji = parts[1]
    meaning = kanji_dict.get(kanji)
    if meaning:
        kanji_entries.append({'kanji': kanji, 'meaning': meaning})
    if len(kanji_entries) >= 2136:
        break

pack_size = math.ceil(len(kanji_entries) / 9)
for i in range(9):
    pack = kanji_entries[i*pack_size:(i+1)*pack_size]
    with open(f'data/kanji_{i+1}.json', 'w', encoding='utf-8') as f:
        json.dump(pack, f, ensure_ascii=False)

print('Generated', len(vocab_entries), 'vocab entries and', len(kanji_entries), 'kanji entries')
