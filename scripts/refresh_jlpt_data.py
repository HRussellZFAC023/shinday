import csv, json, urllib.request, io
from collections import defaultdict

VOCAB_SOURCES = {
    'N5': 'https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n5.csv',
    'N4': 'https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n4.csv',
    'N3': 'https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n3.csv',
    'N2': 'https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n2.csv',
    'N1': 'https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n1.csv',
}

KANJI_SOURCE = 'https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json'

VOCAB_DIFFICULTY_MAP = {
    'N5': [1, 2],
    'N4': [3, 4, 5],
    'N3': [6, 7],
    'N2': [8],
    'N1': [9],
}
KANJI_DIFFICULTY_MAP = VOCAB_DIFFICULTY_MAP  # same mapping

def fetch_text(url):
    with urllib.request.urlopen(url) as resp:
        return resp.read().decode('utf-8')

def split_list(lst, parts):
    size = len(lst)
    base = size // parts
    rem = size % parts
    result = []
    start = 0
    for i in range(parts):
        end = start + base + (1 if i < rem else 0)
        result.append(lst[start:end])
        start = end
    return result

def build_vocab():
    difficulty_data = defaultdict(list)
    for level, url in VOCAB_SOURCES.items():
        text = fetch_text(url)
        reader = csv.DictReader(io.StringIO(text))
        entries = [{"expression": r["expression"], "reading": r["reading"], "meaning": r["meaning"]} for r in reader]
        diffs = VOCAB_DIFFICULTY_MAP[level]
        parts = split_list(entries, len(diffs))
        for diff, part in zip(diffs, parts):
            difficulty_data[diff].extend(part)
    return difficulty_data

def build_kanji():
    text = fetch_text(KANJI_SOURCE)
    data = json.loads(text)
    level_entries = {1: [], 2: [], 3: [], 4: [], 5: []}
    for char, info in data.items():
        level = info.get('jlpt_new')
        if level:
            level_entries[level].append({
                "kanji": char,
                "meanings": info.get('meanings', []),
                "on": info.get('readings_on', []),
                "kun": info.get('readings_kun', []),
            })
    difficulty_data = defaultdict(list)
    for jlpt_level, entries in level_entries.items():
        level_tag = f'N{jlpt_level}'
        diffs = KANJI_DIFFICULTY_MAP[level_tag]
        parts = split_list(entries, len(diffs))
        for diff, part in zip(diffs, parts):
            difficulty_data[diff].extend(part)
    return difficulty_data

def main():
    vocab = build_vocab()
    kanji = build_kanji()
    for diff in sorted(vocab.keys()):
        with open(f'data/vocab_{diff}.json', 'w', encoding='utf-8') as f:
            json.dump(vocab[diff], f, ensure_ascii=False, indent=2)
    for diff in sorted(kanji.keys()):
        with open(f'data/kanji_{diff}.json', 'w', encoding='utf-8') as f:
            json.dump(kanji[diff], f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
