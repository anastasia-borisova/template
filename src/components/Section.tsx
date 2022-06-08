export default function Section(props: { sectionClass: string, header: string, divClass: string, component: any}) {
    return <section className={props.sectionClass}>
              <h2 className="section__header">{props.header}</h2>
              <div className={props.divClass}>{props.component}</div>
           </section>;
}