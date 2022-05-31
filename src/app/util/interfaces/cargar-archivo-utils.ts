class Util {
  static crearArchivo(nombre: string, blob: any) {
    const datajson = JSON.stringify(blob);
    var aFileParts = [datajson];
    var oMyBlob = new Blob(aFileParts, { type: 'text/json' });
    const url = window.URL.createObjectURL(oMyBlob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nombre + '';
    a.click();
  }

  static getNextIndex(array: any[]): number {
    if (array && array.length > 0) {
      return (
        array
          .map((x) => x['id'])
          .reduce(function (a, b) {
            return a > b ? a : b;
          }) + 1
      );
    }
    return 0;
  }
}
export default Util;
