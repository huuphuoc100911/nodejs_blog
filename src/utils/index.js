module.exports = {
    convertDatetimeToDateTime(datetimeString) {
        const date = new Date(datetimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    },

    sortable(field, sort) {
        console.log(sort);
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'fa fa-sort',
            asc: 'fa fa-sort-alpha-asc',
            desc: 'fa fa-sort-alpha-desc',
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sort.type];
        const type = types[sort.type];

        return `<a href="?_sort&column=${field}&type=${type}">
        <i class="${icon}" aria-hidden="true"></i>
    </a>`;
    },
};
