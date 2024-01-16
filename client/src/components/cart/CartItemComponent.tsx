import React from 'react'
import Accordion from '../AccordionComponent'

function CartItemComponent() {
  return (
    <div className="bg-white rounded-lg mb-5">
              <Accordion title="Pilsegardin" addDelete>
                <div className="flex flex-col bg-white rounded-lg">
                  <div className="grid grid-cols-4 text-xs">
                    <div className="pr-5 flex flex-col mx-auto">
                      <span className="">Bred och höjd:</span>
                      <span>200m x 200m</span>
                    </div>
                    <div className="pr-5 flex flex-col mx-auto">
                      <span>Måttyp:</span> <span>something</span>
                    </div>
                    <div className="pr-5 flex flex-col mx-auto">
                      <span>Vävnummer:</span> <span>something</span>
                    </div>
                    <div className="pr-5 flex flex-col mx-auto">
                      <span>Modell:</span> <span>something</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 text-xs pt-5">
                    <div className="pr-5 flex flex-col mx-auto">
                      <span>Beslag</span> <span>200m x 200m</span>
                    </div>
                    <div className="pr-5 flex flex-col mx-auto">
                      <span>Allmogebeslag:</span> <span>something</span>
                    </div>
                    <div className="pr-5 flex flex-col mx-auto">
                      <span>Reglage:</span> <span>something</span>
                    </div>
                    <div className="pr-5 flex flex-col mx-auto">
                      <span>Detaljfärg:</span> <span>something</span>
                    </div>
                  </div>

                  <div className="pt-5 flex justify-center">
                    <button className="bg-white h-min p-2 mr-2 hover:bg-blue-500 hover:text-white rounded-full px-5 text-s">
                      Visa eller Ändra
                    </button>
                  </div>
                </div>
              </Accordion>
            </div>
  )
}

export default CartItemComponent