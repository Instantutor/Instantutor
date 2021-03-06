import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

const AutoCompleteInput = ({
    fieldName,
    fieldData,
    options,
    placeholder,
    searchData,
    setSearchData,
    onChange}
) => {

    const [showAutoComplete, setAutoComplete] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);

    const isMenuHover = useRef(false);
    const isOptionSelected = useRef(false);
    const menuRef = useRef();
    const selectedOptionRef = useRef();

    useEffect(() => {
        if (selectedOptionRef.current) {
            //menuRef.current.scrollTop = selectedOptionRef.current.offsetTop - 8;
            menuRef.current.scroll({
                top: selectedOptionRef.current.offsetTop - 8,
                behavior: "smooth"
            })
        }
    }, [selectedOption])

    function submitSearch() {
        setSearchData({ ...searchData, [fieldName]: options[selectedOption] });

        setAutoComplete(false);
        setSelectedOption(-1);
        isOptionSelected.current = false;
        isMenuHover.current = false;
    }

    const onClick = e => {
        isOptionSelected.current = true;

        submitSearch();
    }

    const onKeyDown = e => {
        if (e.key === "ArrowUp") {
            selectedOption > 0 && setSelectedOption(selectedOption - 1);
        }
        else if (e.key === "ArrowDown") {
            selectedOption < options.length - 1 && setSelectedOption(selectedOption + 1);
            !showAutoComplete && setAutoComplete(true);
        } else if (e.key === "Enter") {
            submitSearch();
        } else {
            setSelectedOption(-1);
        }
    }

    return (
        <div onKeyDown={onKeyDown} className="autocomplete">
            <input
                type="text"
                placeholder={placeholder}
                onChange={e => {onChange(e); setAutoComplete(true);}} 
                onFocus={() => setAutoComplete(true)}
                onBlur={() => !isMenuHover.current && setAutoComplete(false)}
                onClick={() => !showAutoComplete && setAutoComplete(true)}
                name={fieldName}
                value={fieldData}
                autoComplete="off"
            />

            {(showAutoComplete && options.length !== 0 && options[0].length !== 0) &&
            (<div 
                className="autocomplete menu"
                ref={menuRef}
                style={{marginTop: -10}}
                onMouseOver={() => isMenuHover.current = true}
                onMouseLeave={() => isMenuHover.current = false}
            >
                <ul>
                    {options.map( (option, index) => {
                        return (<li
                            className={index === selectedOption ? "option selected" : "option"}
                            id={fieldName}
                            name={fieldName}
                            key={index}
                            ref={index === selectedOption ? selectedOptionRef : null}
                            onMouseOver={() => !isOptionSelected.current && setSelectedOption(index)}
                            onClick={onClick}
                        >
                            {option}
                        </li>)
                    })}
                </ul>
            </div>)}

        </div>)
}

AutoCompleteInput.propTypes = {
    fieldName: PropTypes.string.isRequired,
    fieldData: PropTypes.string,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    searchData: PropTypes.object.isRequired,
    setSearchData: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}

export default AutoCompleteInput
