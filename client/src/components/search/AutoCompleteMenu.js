import { useState } from "react";

const AutoCompleteMenu = ({setSearchData, searchData, setAutoComplete, field, options}) => {

    const [selected, setSelected] = useState(-1);
    const [submitted, setSubmitted] = useState(false);

    const onClick = e => {
        setSubmitted(true);
        setSearchData({ ...searchData, [field]: options[selected] });
        setAutoComplete(false);
    }

    return (
        <div className="autocomplete" style={{marginTop: -10}}>
            <ul>
                {options.map( (option, index) => {
                    return (<li
                        className={index === selected ? "selected" : ""}
                        id={field}
                        name={field}
                        key={index}
                        onMouseOver={() => !submitted && setSelected(index)}
                        onClick={onClick}
                    >
                        {option}
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default AutoCompleteMenu
