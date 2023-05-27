import { useEffect, useState } from "react"
import {MultipleSelectChip} from "./multiple-select"


export function LabelsMultiSelect({ labels, onLabelChange }){
    const [selectedLabels, setSelectedLabels] = useState([]);

    useEffect(() => {
        onLabelChange(selectedLabels)
    }, [selectedLabels])

    function handleLabelChange(event) {
        const label = event.target.value;
        if (event.target.checked) {
            setSelectedLabels([...selectedLabels, label]);
        } else {
            setSelectedLabels(selectedLabels.filter(l => l !== label));
        }
    }
    
    
    return(
        <section className="label-selector">
            <MultipleSelectChip labels={labels}/>
        {/* {labels.map(label => (
            <div key={label}>
                <input
                    type="checkbox"
                    value={label}
                    checked={selectedLabels.includes(label)}
                    onChange={handleLabelChange}
                />
                {label}
            </div>
        ))} */}
    </section>
    )
}