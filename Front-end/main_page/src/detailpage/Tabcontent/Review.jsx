import styles from "./Review.module.css";

const reviews = [
    {
        id: "kevin123@naver.com",
        rating: 5,
        comment: "정말 감동적인 공연이었습니다. 배우들의 연기와 노래가 환상적이었어요! 꼭 다시 보고 싶네요.",
        date: "2024-12-20",
    },
    {
        id: "yuna456@gmail.com",
        rating: 4,
        comment: "무대 연출이 정말 뛰어났습니다. 다만 중간 부분이 조금 지루했어요. 그래도 전체적으로 훌륭한 공연!",
        date: "2024-12-19",
    },
    {
        id: "minho789@daum.net",
        rating: 3,
        comment: "스토리는 평범했지만 음악과 춤은 아주 훌륭했습니다. 다음엔 더 나은 스토리를 기대합니다.",
        date: "2024-12-18",
    },
    {
        id: "sujin555@kakao.com",
        rating: 5,
        comment: "배우들의 열정이 느껴지는 최고의 공연이었어요. 무대 디자인도 정말 아름다웠습니다!",
        date: "2024-12-17",
    },
    {
        id: "hwang999@naver.com",
        rating: 2,
        comment: "기대했던 것보다는 조금 아쉬웠어요. 특히 대사가 잘 안 들렸습니다.",
        date: "2024-12-16",
    },
    {
        id: "jungwoo321@gmail.com",
        rating: 4,
        comment: "좋은 경험이었어요. 가족과 함께 관람했는데 모두 만족했습니다!",
        date: "2024-12-15",
    },
    {
        id: "leehoon777@daum.net",
        rating: 5,
        comment: "너무 재미있게 봤습니다. 감정선이 정말 잘 살아 있었고, 끝까지 몰입했어요.",
        date: "2024-12-14",
    },
    {
        id: "chaeyoung333@kakao.com",
        rating: 3,
        comment: "전체적으로 괜찮았지만, 배우들의 호흡이 조금 아쉬웠습니다.",
        date: "2024-12-13",
    },
];

export default function Review() {
    // ID를 가리는 함수
    const maskId = (id) => {
        const [namePart, domain] = id.split("@");
        const maskedName = namePart.slice(0, 2) + "***";
        return `${maskedName}@${domain.split(".")[0]}`;
    };

    return (
        <div className={styles.Review}>
            <h1>뮤지컬 후기</h1>
            <ul className={styles.ReviewList}>
                {reviews.map((review, index) => (
                    <li key={index} className={styles.ReviewItem}>
                        <div className={styles.ReviewHeader}>
                            <span className={styles.UserId}>{maskId(review.id)}</span>
                            <span className={styles.Rating}>{"★".repeat(review.rating)}</span>
                        </div>
                        <p className={styles.Comment}>{review.comment}</p>
                        <span className={styles.Date}>{review.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
