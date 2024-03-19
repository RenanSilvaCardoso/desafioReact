export default function TableCategories({url}){
    return(


        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Tax</th>
                </tr>
            </thead>
            <tbody>
                {data.map((category) => (
                    <tr key={category.code}>
                        <td>{category.code}</td>
                        <td>{category.category_name}</td>
                        <td>{category.tax}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}