function Button({ text, onClick, variant = "primary" }) {

    const styles = {
        primary: "bg-gray-500 rounded py-3 px-1 text-white hover:bg-gray-700",

        blue: "bg-blue-500 rounded px-3 py-1 text-white hover:bg-blue-700",

        red: "bg-red-500 rounded px-3 py-1 text-white hover:bg-red-600"
    }

    return (
        <button
            onClick={onClick}
            className={styles[variant]}
        >
            {text}
        </button>
    )

}
export default Button