export const homePagesKey = "homePagesHanlder";
const actualPage = JSON.parse(localStorage.getItem(homePagesKey));

const HomePagesHanlder = {
    currentPage: actualPage.current_page || "myBoards",
    setCurrentPage(page) {
        this.currentPage = page;
        const data = { current_page: page }
        localStorage.setItem(homePagesKey, data);
    }
}

export default HomePagesHanlder;