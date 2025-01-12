// Enhanced BoardField.js
export const BoardField = ({
    cards,
    isTargeting,
    onCardSelect,
    selectedTargets
}) => {
    return (
        <div className={`board-battlefield${isTargeting ? ' targeting' : ''}`}>
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`board-card${selectedTargets.includes(card._id) ? ' selected' : ''
                        }${isTargeting ? ' targetable' : ''}`}
                    onClick={() => isTargeting && onCardSelect(card._id)}
                >
                    <CardTitle card={card} />
                    <CardDescription card={card} />
                    {card.effects?.map((effect, i) => (
                        <EffectIndicator key={i} effect={effect} />
                    ))}
                </div>
            ))}
        </div>
    );
};