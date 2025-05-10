export const slaps = {
    slides: [
        {
            id: "review",
            title: "Game Refresher"
        },
        {
            id: "doubles",
            title: "Doubles",
            description: "Two cards of the same rank.",
            dropZones: 2,
            correctSequence: ["3 3"],
            cards: [
                {
                    id: 1,
                    rank: "3",
                    suit: "clubs"
                },
                {
                    id: 2,
                    rank: "3",
                    suit: "hearts"
                }
            ]
        },
        {
            id: "sandwich",
            title: "Sandwich",
            description: "Two cards of the same rank are separated by a card of a different rank.",
            dropZones: 3,
            correctSequence: ["3 8 3"],
            cards: [
                {
                    id: 1,
                    rank: "3",
                    suit: "clubs"
                },
                {
                    id: 2,
                    rank: "8",
                    suit: "spades"
                },
                {
                    id: 3,
                    rank: "3",
                    suit: "hearts"
                }
            ]
        },
        {
            id: "tens",
            title: "Tens",
            description: "The rank of the previous 2 or 3 cards sum to 10. The card may also be rank 10.",
            dropZones: 2,
            correctSequence: ["2 8","8 2"],
            cards: [
                {
                    id: 1,
                    rank: "8",
                    suit: "spades"
                },
                {
                    id: 2,
                    rank: "2",
                    suit: "hearts"
                }
            ]
        },
        {
            id: "marriage",
            title: "Marriage",
            description: "King and Queen are played consecutively (any order).",
            dropZones: 2,
            correctSequence: ["K Q","Q K"],
            cards: [
                {
                    id: 1,
                    rank: "K",
                    suit: "spades"
                },
                {
                    id: 2,
                    rank: "Q",
                    suit: "hearts"
                }
            ]
        },
        {
            id: "staircase",
            title: "Staircase",
            description: "3 cards ordered consecutively (up or down). Ace counts as both the highest and lowest card.",
            dropZones: 3,
            correctSequence: ["2 3 4","4 3 2"],
            cards: [
                {
                    id: 1,
                    rank: "2",
                    suit: "hearts"
                },
                {
                    id: 2,
                    rank: "3",
                    suit: "clubs"
                },
                {
                    id: 3,
                    rank: "4",
                    suit: "spades"
                }
            ]
        },
        {
            id: "conclusion",
            title: "You've completed the tutorial!"
        }
    ]
}; 