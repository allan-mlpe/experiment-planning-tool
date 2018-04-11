package br.ufpe.cin.pcvt.api.converters;

/**
 * @author Allan Monteiro de Lima (aml3@cin.ufpe.br)
 */
public interface IVOConverter<A, B> {
    public B convertToVO(A object);

    public A convertFromVO(B object);
}
