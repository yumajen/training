export class Member {
    id: number;
    name: string;
    prof: string;
    voted: number;

    static members: Member[] = [
        { id: 1, name: 'Samidare', prof: 'My name is "Samidare". Nice to meet you.', voted: 5 },
        { id: 2, name: 'Maya', prof: 'My name is "Maya".', voted: 6 },
        { id: 3, name: 'Kiso', prof: 'I\'ll give you the Great Victory.', voted: 1 },
        { id: 4, name: 'Sendai', prof: 'My name is "Sendai".', voted: 2 },
        { id: 5, name: 'Akagi', prof: 'My name is "Akagi".', voted: 1 },
        { id: 6, name: 'Hyuga', prof: 'My name is "Hyuga".', voted: 3 },
        { id: 7, name: 'Jyunyo', prof: 'My name is "Jyunto".', voted: 5 }
    ]
}